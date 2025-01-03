package com.example.entity.EventEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("events")
public class EventEntity {
    @PrimaryKey
    private String eventId; // UUID 형태
    private String eventTitle;
    private String eventDesc;
    private String imageUrl;
    private String startDate; // 날짜 문자열 (YYYY-MM-DD)
    private String endDate;
    private String status; // 진행 상태 (예: 진행 중, 종료됨 )
}
