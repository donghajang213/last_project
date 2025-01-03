package com.example.entity.BannerEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("banners")
public class BannerEntity {
    @PrimaryKey
    private String bannerId; // UUID 형태
    private String imageUrl;
    private String redirectUrl;
    private int priority;
    private String startDate; // 날짜 문자열 (YYYY-MM-DD)
    private String endDate;
}
