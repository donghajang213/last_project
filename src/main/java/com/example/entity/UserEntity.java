package com.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDate;

@Getter
@Setter
@Data
@Table("users")
public class UserEntity {

    @PrimaryKey
    @Id
    @Column("user_id") // Cassandra 컬럼 이름과 매핑
    private String userId;

    @Column("address")
    private String address;

    @Column("birth_date")
    private LocalDate birthDate;

    @Column("detailed_address")
    private String detailedAddress;

    @Column("email")
    private String email;

    @Column("gender")
    private String gender;

    @Column("name")
    private String name;

    @Column("password")
    private String password;

    @Column("phone_number")
    private String phoneNumber;

    public UserEntity() {
    }

    public UserEntity(String userId, String address, LocalDate birthDate, String detailedAddress, String email, String gender, String name, String password, String phoneNumber) {
        this.userId = userId;
        this.address = address;
        this.birthDate = birthDate;
        this.detailedAddress = detailedAddress;
        this.email = email;
        this.gender = gender;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userId='" + userId + '\'' +
                ", address='" + address + '\'' +
                ", birthDate=" + birthDate +
                ", detailedAddress='" + detailedAddress + '\'' +
                ", email='" + email + '\'' +
                ", gender='" + gender + '\'' +
                ", name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
