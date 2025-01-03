package com.example.controller;

import com.example.entity.UserEntity;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/permissions")
    public List<UserEntity> getPermissionRequests() {
        return userService.getPendingUsers();
    }

    @PutMapping("/approve/{userId}")
    public ResponseEntity<?> approveUserRole(@PathVariable String userId, @RequestBody Map<String, String> roleMap){
        String role = roleMap.get("role");
        System.out.println("역할 승인 요청: userId=" + userId + ", role=" + role); // 로그 추가
        return userService.approveUserRole(userId, role);
    }

    @PutMapping("/rejectRole/{userId}")
    public ResponseEntity<?> rejectUserRole(@PathVariable String userId){
        return userService.rejectUserRole(userId);
    }


}
