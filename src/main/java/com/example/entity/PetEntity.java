package com.example.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Getter
@Setter
@Data
@Table("pets") // Cassandra 테이블 이름
public class PetEntity {

    @PrimaryKey
    @Id
    @Column("pet_id") // 반려동물 ID
    private String petId;

    @Column("user_id") // 사용자 ID
    private String userId;

    @Column("name") // 반려동물 이름
    private String name;

    @Column("breed") // 품종
    private String breed;

    @Column("birth_date") // 생일 (연월일을 합친 필드)
    private String birthDate;

    @Column("gender") // 성별
    private String gender;

    @Column("neutering_status") // 중성화 여부
    private String neuteringStatus;

    @Column("weight_kg") // 몸무게 (kg)
    private Double weightKg;

    @Column("registration_number") // 등록 번호
    private String registrationNumber;

    @Column("pet_image") // 반려동물 사진 경로
    private String petImage;

    public PetEntity() {}

    public PetEntity(String petId, String userId, String name, String breed, String birthDate, String gender,
                     String neuteringStatus, Double weightKg, String registrationNumber, String petImage) {
        this.petId = petId;
        this.userId = userId;
        this.name = name;
        this.breed = breed;
        this.birthDate = birthDate;
        this.gender = gender;
        this.neuteringStatus = neuteringStatus;
        this.weightKg = weightKg;
        this.registrationNumber = registrationNumber;
        this.petImage = petImage;
    }

    @Override
    public String toString() {
        return "PetEntity{" +
                "petId='" + petId + '\'' +
                ", userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", breed='" + breed + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", gender='" + gender + '\'' +
                ", neuteringStatus='" + neuteringStatus + '\'' +
                ", weightKg=" + weightKg +
                ", registrationNumber='" + registrationNumber + '\'' +
                ", petImage='" + petImage + '\'' +
                '}';
    }
}
