package com.example.service.DashboardService;

import com.example.entity.DashboardEntity.BreedRankingEntity;
import com.example.repository.DashboardRepository.BreedRankingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedRankingService {

    private final BreedRankingRepository breedRankingRepository;

    public BreedRankingService(BreedRankingRepository breedRankingRepository) {
        this.breedRankingRepository = breedRankingRepository;
    }

    public List<BreedRankingEntity> getAllBreedRankings() {
        return breedRankingRepository.findAll();
    }
}