package com.example.controller.UserInfoController;

import com.example.entity.UserInfoEntity.UserInfoEntity;
import com.example.service.UserInfoService.UserInfoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * UserInfoController
 *
 * 유저 정보를 관리하는 컨트롤러로, 모든 유저와 특정 유저의 상세 정보를 반환합니다.
 */
@RestController
@RequestMapping("/admin/userinfo")
public class UserInfoController {

    // UserInfoService를 통해 비즈니스 로직 처리
    private final UserInfoService userInfoService;

    /**
     * 생성자 주입 방식으로 UserInfoService를 주입받음
     *
     * @param userInfoService 유저 정보 관련 서비스 클래스
     */
    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    /**
     * 모든 유저 정보 목록 반환
     *
     * @return 유저 정보 엔티티 리스트
     */
    @GetMapping
    public List<UserInfoEntity> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    /**
     * 특정 유저의 상세 정보 반환
     *
     * @param userId 유저 ID
     * @return 유저 정보 엔티티
     */
    @GetMapping("/admin/userinfo/{userId}") // "{userId}"
    public UserInfoEntity getUserById(@PathVariable String userId) {
        return userInfoService.getUserById(userId);
    }
}
