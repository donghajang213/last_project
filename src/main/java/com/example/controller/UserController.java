package com.example.controller;

import com.example.entity.UserEntity;
import com.example.repository.UserRepository;
import com.example.service.UserService;
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

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{email}")
    public UserEntity getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

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
    public ResponseEntity<?> loginUser(@RequestBody UserEntity loginRequest) {
        try {
            String userId = loginRequest.getUserId();
            String rawPassword = loginRequest.getPassword();

            // ID로 사용자 조회 및 비밀번호 검증
            boolean isValid = userService.validateLogin(userId, rawPassword);
            if (isValid) {
                // JSON 형태로 응답
                return ResponseEntity.ok(Map.of("message", "로그인 성공"));
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "로그인 처리 중 오류 발생: " + e.getMessage()));
        }
    }

}
