package com.example.service;

import com.example.entity.UserEntity;
import com.example.entity.VetEntity;
import com.example.repository.UserRepository;
import com.example.repository.VetRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VetService {

    @Autowired
    private VetRepository vetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public VetService(VetRepository vetRepository, UserRepository userRepository) {
        this.vetRepository = vetRepository;
        this.userRepository = userRepository;
    }

    public List<VetEntity> getAllVets() {
        return vetRepository.findAll();
    }

    public Optional<VetEntity> getVetById(String userId) {
        return vetRepository.findById(userId);
    }

    public VetEntity saveVet(VetEntity vet) {
        return vetRepository.save(vet);
    }

    public void deleteVet(String userId) {
        vetRepository.deleteById(userId);
    }

    // 수의사 역할을 가진 사용자를 vets 테이블에 추가하는 메소드
    public void addVetsFromUsers() {
        List<UserEntity> users = userRepository.findByUserRole("VET");
        for (UserEntity user : users) {
            VetEntity vet = new VetEntity();
            vet.setUserId(user.getUserId());
            vet.setName(user.getName());
            vet.setEmail(user.getEmail());
            vet.setAddress(user.getAddress());
            vet.setPhoneNumber(user.getPhoneNumber());
            vet.setVetImage(user.getVetImage());
            vet.setConsultationCount(0); // 초기 상담 건수
            vet.setVetRating(0); // 초기 평점
            vet.setVetReview(""); // 초기 리뷰

            vetRepository.save(vet);
        }
//
//        public void addVetFromUser (UserEntity user){
//            VetEntity vet = new VetEntity();
//            vet.setUserId(user.getUserId());
//            vet.setName(user.getName());
//            vet.setEmail(user.getEmail());
//            vet.setAddress(user.getAddress());
//            vet.setPhoneNumber(user.getPhoneNumber());
//            vet.setVetImage(user.getVetImage());
//            vet.setConsultationCount(0); // 초기 상담 건수
//            vet.setVetRating(0); // 초기 평점
//            vet.setVetReview(""); // 초기 리뷰
//            vetRepository.save(vet); // 저장
//            // }
//        }
    }
}
