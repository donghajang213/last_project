package com.example.service;

import com.example.entity.UserEntity;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {



    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // DI를 통해 Bean 주입
    }

    // 모든 사용자 조회
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // 특정 이메일로 사용자 조회
    public UserEntity getUserByEmail(String email) {
        Optional<UserEntity> user = Optional.ofNullable(userRepository.findByEmail(email));
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("해당 이메일로 등록된 사용자가 없습니다.");
        }
    }

    // 사용자 저장 (회원가입)
    public UserEntity saveUser(UserEntity user) {
        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user); // Cassandra에 데이터 저장
    }

    public boolean validateLogin(String userId, String rawPassword) {
        // ID로 사용자 조회
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            // 입력된 비밀번호(rawPassword)와 저장된 암호화된 비밀번호(user.getPassword()) 비교
            return passwordEncoder.matches(rawPassword, user.getPassword());
        } else {
            throw new RuntimeException("해당 ID로 등록된 사용자가 없습니다.");
        }
    }
}
