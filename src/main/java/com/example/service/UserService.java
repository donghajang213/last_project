package com.example.service;

import com.example.entity.UserEntity;
import com.example.repository.PetRepository;
import com.example.repository.UserRepository;
import org.springframework.http.ResponseEntity;
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

        System.out.println("저장 전 역할: " + user.getUserRole()); // 역할 로그 추가

        // 사용자 역할에 따라 필드 설정
        if ("PENDING".equals(user.getUserRole())) {
            if (user.getVetImage() == null) {
                user.setVetImage("default_image.jpg");
            }
        } else {
            // 일반 회원 또는 판매자일 경우 수의사 관련 필드 초기화
            user.setVetImage(null);
            user.setVetLicense(null);
            user.setBankAccount(null);
            user.setBusinessNumber(null);
        }

        UserEntity savedUser = userRepository.save(user); // Cassandra에 데이터 저장
        System.out.println("저장 후 역할: " + savedUser.getUserRole()); // 역할 저장 후 로그

        return savedUser;
    }


    // PENDING 상태의 사용자 목록 가져오기
    public List<UserEntity> getPendingUsers(){
        return userRepository.findByUserRole("PENDING");
    }

    // 사용자 역할 승인
    public ResponseEntity<?> approveUserRole(String userId, String role) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            if("PENDING".equals(user.getUserRole())){
                user.setUserRole(role);
                userRepository.save(user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.badRequest().body("승인되지 않은 역할 변경 요청입니다.");
            }
        } else{
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }
    }

    // 사용자 역할 거부
    public ResponseEntity<?> rejectUserRole(String userId){
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            if("PENDING".equals(user.getUserRole())){
                user.setUserRole("REJECTED");
                userRepository.save(user);
                return ResponseEntity.ok(user);
            } else{
                return ResponseEntity.badRequest().body("거부되지 않은 역할 변경 요청입니다.");
            }
        } else {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }
    }


    // 로그인 검증
    public boolean validateLogin(String userId, String rawPassword) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            if ("REJECTED".equals(user.getUserRole())) {
                return false;
            }
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
