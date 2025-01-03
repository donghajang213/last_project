package com.example.repository.DashboardRepository;

import com.example.entity.DashboardEntity.SignupRankingEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

/**
 * 회원가입 랭킹 Repository
 */
@Repository
public interface SignupRankingRepository extends CassandraRepository<SignupRankingEntity, String> {
}