package com.example.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import java.util.UUID;

@Table
@Getter
@Setter
@ToString
public class VetEntity {

    @Id
    @PrimaryKey
    @Column("user_id")
    private String userId;

    @Column("name")
    private String name;

    @Column("clinic_address")
    private String address;

    @Column("vet_review")
    private String vetReview;

    @Column("consultation_count")
    private int consultationCount;

    @Column("latitude")
    private double latitude;

    @Column("longitude")
    private double longitude;

    @Column("email")
    private String email;

    @Column("phone_number")
    private String phoneNumber;

    @Column("vet_rating")
    private double vetRating;

    @Column("vet_image")
    private String vetImage;
}
