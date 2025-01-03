package com.example.repository.DashboardRepository;

import com.example.entity.DashboardEntity.DiseaseRankingEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

/**
 * 질병 랭킹 Repository
 */
@Repository
public interface DiseaseRankingRepository extends CassandraRepository<DiseaseRankingEntity, Integer> {
}