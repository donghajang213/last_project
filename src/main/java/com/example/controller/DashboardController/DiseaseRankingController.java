package com.example.controller.DashboardController;

import com.example.entity.DashboardEntity.DiseaseRankingEntity;
import com.example.service.DashboardService.DiseaseRankingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 질병 랭킹 컨트롤러
 */
@RestController
@RequestMapping("/ranking/disease")
public class DiseaseRankingController {

    private final DiseaseRankingService diseaseRankingService;

    public DiseaseRankingController(DiseaseRankingService diseaseRankingService) {
        this.diseaseRankingService = diseaseRankingService;
    }

    @GetMapping
    public List<DiseaseRankingEntity> getDiseaseRankings() {
        return diseaseRankingService.getAllDiseaseRankings();
    }
}