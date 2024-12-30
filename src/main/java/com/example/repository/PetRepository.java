package com.example.repository;

import com.example.entity.PetEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends CassandraRepository<PetEntity, String> {
    // 사용자 ID로 반려동물 목록 조회
    List<PetEntity> findByUserId(String userId);
}
