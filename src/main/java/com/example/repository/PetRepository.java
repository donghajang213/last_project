package com.example.repository;

import com.example.entity.PetEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PetRepository extends CassandraRepository<PetEntity, UUID> {
    // 사용자 ID로 반려동물 목록 조회
    List<PetEntity> findByUserId(String userId);
}
