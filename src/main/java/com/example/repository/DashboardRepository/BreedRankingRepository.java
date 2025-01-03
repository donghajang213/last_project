package com.example.repository.DashboardRepository;

import com.example.entity.DashboardEntity.BreedRankingEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreedRankingRepository extends CassandraRepository<BreedRankingEntity, String> {
}