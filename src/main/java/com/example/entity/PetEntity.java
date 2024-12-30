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
@Table("pets")
public class PetEntity {

    @PrimaryKey
    @Id
    @Column("pet_id") // 반려동물 ID
    private String petId;

    @Column("user_id") // 사용자 ID
    private String userId;

    @Column("pet_name") // 반려동물 이름
    private String petName;

    @Column("breed") // 품종
    private String breed;

    @Column("birth_year") // 태어난 연도
    private Integer birthYear;

    @Column("birth_month") // 태어난 달
    private Integer birthMonth;

    @Column("birth_day") // 태어난 날짜
    private Integer birthDay;

    @Column("gender") // 성별
    private String gender;

    @Column("neutered") // 중성화 여부
    private Boolean neutered;

    @Column("weight") // 몸무게
    private Double weight;

    @Column("registration_number") // 등록 번호
    private String registrationNumber;

    @Column("photo_url") // 사진 URL
    private String photoUrl;

    public PetEntity() {}

    public PetEntity(String petId, String userId, String petName, String breed, Integer birthYear, Integer birthMonth,
                     Integer birthDay, String gender, Boolean neutered, Double weight, String registrationNumber, String photoUrl) {
        this.petId = petId;
        this.userId = userId;
        this.petName = petName;
        this.breed = breed;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.gender = gender;
        this.neutered = neutered;
        this.weight = weight;
        this.registrationNumber = registrationNumber;
        this.photoUrl = photoUrl;
    }

    @Override
    public String toString() {
        return "PetEntity{" +
                "petId='" + petId + '\'' +
                ", userId='" + userId + '\'' +
                ", petName='" + petName + '\'' +
                ", breed='" + breed + '\'' +
                ", birthYear=" + birthYear +
                ", birthMonth=" + birthMonth +
                ", birthDay=" + birthDay +
                ", gender='" + gender + '\'' +
                ", neutered=" + neutered +
                ", weight=" + weight +
                ", registrationNumber='" + registrationNumber + '\'' +
                ", photoUrl='" + photoUrl + '\'' +
                '}';
    }
}
