package com.example.service;

import com.example.entity.UserEntity;
import com.example.repository.PetRepository;
import com.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Path fileStorageLocation;

    public UserService(UserRepository userRepository,PetRepository petRepository ,BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.passwordEncoder = passwordEncoder; // DI를 통해 Bean 주입
        this.fileStorageLocation = Paths.get("E:/images");

        // 경로 생성
        try {
            Files.createDirectories(fileStorageLocation);
            if (!Files.isWritable(fileStorageLocation)) {
                throw new IOException("지정된 디렉터리에 쓸 수 없습니다: " + fileStorageLocation);
            }
        } catch (IOException e) {
            throw new RuntimeException("디렉터리 생성 또는 접근 실패", e);
        }
    }


    // 수의사 이미지 저장 로직
    public String storeVetImage(MultipartFile vetImage) throws IOException {
        if (vetImage == null || vetImage.isEmpty()) {
            throw new IllegalArgumentException("업로드된 파일이 비어 있거나 null입니다.");
        }
        String fileName = UUID.randomUUID().toString() + "_" + vetImage.getOriginalFilename();
        fileName = fileName.replaceAll("[^a-zA-Z0-9._-]", "_"); // 파일명 정리

        Path targetLocation = fileStorageLocation.resolve(fileName);

        Files.copy(vetImage.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return targetLocation.toString(); // 저장된 파일 경로 반환
    }

    // 사용자 저장 (회원가입)
    public UserEntity saveUser(UserEntity user) {
        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 사용자 역할에 따라 필드 설정
        if("VET".equals(user.getUserRole())) {
            if (user.getVetImage() == null) {
                user.setVetImage("default_image.jpg");
            }
        }else {
            // 일반 회원 또는 판매자일 경우 수의사 필드 초기화
            user.setVetImage(null);
            user.setVetLicense(null);
            user.setBankAccount(null);
            user.setBusinessNumber(null);
        }
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
