package com.example.service.DashboardService;

import com.example.entity.DashboardEntity.DiseaseRankingEntity;
import com.example.repository.DashboardRepository.DiseaseRankingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 질병 랭킹 서비스
 */
@Service
public class DiseaseRankingService {

    private final DiseaseRankingRepository diseaseRankingRepository;

    public DiseaseRankingService(DiseaseRankingRepository diseaseRankingRepository) {
        this.diseaseRankingRepository = diseaseRankingRepository;
    }

    public List<DiseaseRankingEntity> getAllDiseaseRankings() {
        return diseaseRankingRepository.findAll();
    }
}