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

@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestPart("user") UserEntity user,
                                        @RequestPart(value = "vetImage", required = false) MultipartFile vetImage) {


        System.out.println("user 데이터: " + user.toString());
        System.out.println("받은 역할: " + user.getUserRole());
        // 수동 유효성 검사
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            System.out.println("유효성 검사 실패 : 아이디");
            return ResponseEntity.badRequest().body("유효성 검사 실패: 아이디는 필수 항목입니다.");
        }

        // userRole의 null 검사 추가
        if (user.getUserRole() == null || user.getUserRole().isEmpty()) {
            System.out.println("유효성 검사 실패 : 역할");
            return ResponseEntity.badRequest().body("유효성 검사 실패: ");
        }

        // 역할에 따른 유효성 검사 및 설정
        switch (user.getUserRole().toUpperCase()) {
            case "VET":
                if (user.getVetLicense() == null || user.getVetLicense().isEmpty()) {
                    System.out.println("유효성 검사 실패: 수의사 면허번호");
                    return ResponseEntity.badRequest().body("유효성 검사 실패: 수의사 면허번호는 필수 항목입니다.");
                }
                if (vetImage == null || vetImage.isEmpty()) {
                    System.out.println("유효성 검사 실패 : 수의사 이미지");
                    return ResponseEntity.badRequest().body("유효성 검사 실패: 수의사 이미지는 필수 항목입니다.");
                }
                user.setUserRole("PENDING"); // 수의사는 관리자의 승인이 필요하도록 PENDING으로 설정
                break;
            case "SELLER":
                user.setUserRole("PENDING"); // 판매자도 관리자의 승인이 필요하도록 PENDING으로 설정
                break;
            case "GENERAL":
            case "CUSTOMER":
                user.setUserRole("CUSTOMER"); // 고객은 바로 가입되도록 CUSTOMER 역할 설정
                break;
            default:
                System.out.println("잘못된 역할");
                return ResponseEntity.badRequest().body("유효성 검사 실패");
        }
        System.out.println("선정된 역할: "+ user.getUserRole());

        try {
            // 수의사 이미지 처리
            if ("PENDING".equals(user.getUserRole()) && vetImage != null) {
                // 이미지 파일을 저장하거나 다른 방법으로 처리
                String imagePath = userService.storeVetImage(vetImage);
                user.setVetImage(imagePath); // 이미지 경로를 사용자 엔티티에 설정

            }

            UserEntity savedUser = userService.saveUser(user); // 데이터 저장
            System.out.println("역할 저장 전 : " + user.getUserRole());
            System.out.println("역할 저장 후 : " + savedUser.getUserRole());
            return ResponseEntity.ok(savedUser);

        } catch (IllegalArgumentException e) {
            System.out.println("유효하지 않은 파일 업로드 : " + e.getMessage());
            return ResponseEntity.badRequest().body("유효하지 않은 파일 업로드: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("서버 내부 오류 : " + e.getMessage());
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
    @GetMapping("/me")
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

}
