package com.example.controller;

import com.example.entity.UserEntity;
import com.example.repository.UserRepository;
import com.example.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> createUser(@RequestBody UserEntity user) {
        try {
            UserEntity savedUser = userService.saveUser(user); // 데이터 저장
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("회원가입 중 오류 발생: " + e.getMessage());
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
}
