package com.example.service;

import com.example.entity.DiseaseEntity;
import com.example.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    public DiseaseEntity saveDiseaseData(MultipartFile file, String userId) {
        DiseaseEntity entity = new DiseaseEntity();

        try {
            // 디렉토리 생성
            File originalDir = new File(UPLOAD_DIR + "original/");
            File processedDir = new File(UPLOAD_DIR + "processed/");
            if (!originalDir.exists()) originalDir.mkdirs();
            if (!processedDir.exists()) processedDir.mkdirs();

            // 원본 이미지 저장
            String originalFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File originalFile = new File(originalDir, originalFileName);
            file.transferTo(originalFile);

            // 분석용 이미지 복사
            String processedFileName = "processed_" + originalFileName;
            File processedFile = new File(processedDir, processedFileName);
            Files.copy(originalFile.toPath(), processedFile.toPath());

            // 엔티티 데이터 생성
            entity.setDiseaseId(UUID.randomUUID());
            entity.setUserId(userId);
            entity.setDogId(null);  // dogId는 null로 설정
            long timestamp = System.currentTimeMillis();  // Unix timestamp (밀리초)

            // timestamp를 `Date` 객체로 변환
            Date uploadDate = new Date(timestamp);

            // 날짜 형식을 "년-월-일 시:분:초" 형식으로 변환
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String formattedDate = sdf.format(uploadDate);

            // DB에 저장할 Unix timestamp 값
            entity.setUploadDate(timestamp);  // `uploadDate`에 Unix timestamp 저장
            entity.setOriginImagePath("/uploads/original/" + originalFileName);
            entity.setProcessedImagePath("/uploads/processed/" + processedFileName);
            entity.setPredictedDiseaseId(1); // 샘플 데이터
            entity.setPredictedDisease("구진, 플라크");
            entity.setStatus("COMPLETED");

            System.out.println("엔티티 데이터 생성 완료: " + entity);
            System.out.println("업로드 시간: " + formattedDate);  // 변환된 시간 출력

            // 데이터 저장
            DiseaseEntity savedEntity = diseaseRepository.save(entity);
            System.out.println("데이터 저장 성공: " + savedEntity);

            return savedEntity;

        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 실패: " + e.getMessage());
        }
    }
}

