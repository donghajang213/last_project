package com.example.controller.DashboardController;

import com.example.entity.DashboardEntity.SignupRankingEntity;
import com.example.service.DashboardService.SignupRankingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 회원가입 랭킹 컨트롤러
 */
@RestController
@RequestMapping("/ranking/signup")
public class SignupRankingController {

    private final SignupRankingService signupRankingService;

    public SignupRankingController(SignupRankingService signupRankingService) {
        this.signupRankingService = signupRankingService;
    }

    @GetMapping
    public List<SignupRankingEntity> getSignupRankings() {
        return signupRankingService.getAllRankings();
    }
}