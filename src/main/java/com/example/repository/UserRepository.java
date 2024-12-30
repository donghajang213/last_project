package com.example.repository;

import com.example.entity.UserEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CassandraRepository<UserEntity, String> {

    // 필요한 경우 추가적인 커스텀 쿼리를 선언할 수 있습니다.
    // 예: 특정 이메일로 사용자 검색
    UserEntity findByEmail(String email);

    // 예: 특정 이름과 성별로 사용자 검색
    List<UserEntity> findByNameAndGender(String name, String gender);
}
