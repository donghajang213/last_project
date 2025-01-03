package com.example.service.DashboardService;

import com.example.entity.DashboardEntity.SignupRankingEntity;
import com.example.repository.DashboardRepository.SignupRankingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 회원가입 랭킹 서비스
 */
@Service
public class SignupRankingService {

    private final SignupRankingRepository signupRankingRepository;

    public SignupRankingService(SignupRankingRepository signupRankingRepository) {
        this.signupRankingRepository = signupRankingRepository;
    }

    public List<SignupRankingEntity> getAllRankings() {
        return signupRankingRepository.findAll();
    }
}