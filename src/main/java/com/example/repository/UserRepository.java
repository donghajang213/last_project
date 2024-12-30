package com.example.repository;

import com.example.entity.UserEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CassandraRepository<UserEntity, String> {

    // 예: 특정 이름과 성별로 사용자 검색
    List<UserEntity> findByNameAndGender(String name, String gender);
}