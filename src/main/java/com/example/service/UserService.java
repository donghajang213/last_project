package com.example.service;

import com.example.entity.UserEntity;
import com.example.repository.PetRepository;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PetRepository petRepository ,BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.passwordEncoder = passwordEncoder; // DI를 통해 Bean 주입
    }

    // 사용자 저장 (회원가입)
    public UserEntity saveUser(UserEntity user) {
        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user); // Cassandra에 데이터 저장
    }

    // 로그인 검증
    public boolean validateLogin(String userId, String rawPassword) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }

    // 사용자 ID로 사용자 정보 조회
    public UserEntity getUserById(String userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("해당 ID로 등록된 사용자가 없습니다.");
        }
    }

}
