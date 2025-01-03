package com.example.repository.UserInfoRepository;

import com.example.entity.UserInfoEntity.UserInfoEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends CassandraRepository<UserInfoEntity, String> {
    // 기본 CRUD 메서드 제공
}
