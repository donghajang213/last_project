package com.example.controller;

import com.example.entity.UserEntity;
import com.example.repository.UserRepository;
import com.example.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping
//    public List<UserEntity> getAllUsers() {
//        return userService.getAllUsers();
//    }


    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestPart("user") UserEntity user,
                                        @RequestPart(value = "vetImage", required = false) MultipartFile vetImage) {

        // 수동 유효성 검사
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            return ResponseEntity.badRequest().body("유효성 검사 실패: 아이디는 필수 항목입니다.");
        }

        // 수의사 유효성 검사
        if("VET".equals(user.getUserRole())) {
            if (user.getVetLicense() == null || user.getVetLicense().isEmpty()) {
                return ResponseEntity.badRequest().body("유효성 검사 실패: 수의사 면허번호는 필수 항목입니다.");
            }
            if(vetImage == null || vetImage.isEmpty()) {
                return ResponseEntity.badRequest().body("유효성 검사 실패: 수의사 이미지는 필수 항목입니다.");

            }
        }

        try {
            // 수의사 이미지 처리
            if ("VET".equals(user.getUserRole()) && vetImage != null) {
                // 이미지 파일을 저장하거나 다른 방법으로 처리
                String imagePath = userService.storeVetImage(vetImage);
                user.setVetImage(imagePath); // 이미지 경로를 사용자 엔티티에 설정

            } else {
                // 일반 회원 또는 판매자일 경우 수의사 관련 필드 초기화
                user.setVetImage(null);
                user.setVetLicense(null);
                user.setBankAccount(null);
                user.setBusinessNumber(null);
            }

            UserEntity savedUser = userService.saveUser(user); // 데이터 저장
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("유효하지 않은 파일 업로드: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 내부 오류: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserEntity loginRequest, HttpSession session) {
        String userId = loginRequest.getUserId();
        String rawPassword = loginRequest.getPassword();
        // 로그인 검증
        boolean isValid = userService.validateLogin(userId, rawPassword);
        if (isValid) {
            // 세션에 사용자 정보 저장
            session.setAttribute("userId", userId);
            UserEntity user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다."));
        }
    }
    @GetMapping("/user/me")
    public ResponseEntity<?> getMyInfo(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인 상태가 아닙니다.");
        }

        UserEntity user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        return ResponseEntity.ok(user);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        if (session != null) {
            session.invalidate(); // 세션 무효화
            System.out.println("로그아웃 성공: 세션이 무효화되었습니다.");
            return ResponseEntity.ok(Map.of("message", "로그아웃 성공"));
        }
        System.out.println("로그아웃 실패: 세션이 이미 무효화되었습니다.");
        return ResponseEntity.status(400).body("세션이 없습니다.");
    }
}
