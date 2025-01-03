package com.example.controller.DashboardController;

import com.example.entity.DashboardEntity.BreedRankingEntity;
import com.example.service.DashboardService.BreedRankingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 품종 랭킹 컨트롤러
 */
@RestController
@RequestMapping("/ranking/breed")
public class BreedRankingController {

    private final BreedRankingService breedRankingService;

    public BreedRankingController(BreedRankingService breedRankingService) {
        this.breedRankingService = breedRankingService;
    }

    @GetMapping
    public List<BreedRankingEntity> getBreedRankings() {
        return breedRankingService.getAllBreedRankings();
    }
}