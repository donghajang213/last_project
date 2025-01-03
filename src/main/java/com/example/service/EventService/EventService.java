package com.example.service.EventService;

import com.example.entity.EventEntity.EventEntity;
import com.example.repository.EventRepository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // 모든 이벤트 조회
    public List<EventEntity> getAllEvents() {
        return eventRepository.findAll();
    }

    // 이벤트 추가
    public EventEntity addEvent(EventEntity event) {
        event.setEventId(UUID.randomUUID().toString()); // UUID 생성
        event.setStatus("진행중"); // 기본 상태를 '진행중'으로 설정
        return eventRepository.save(event);
    }

    // 이벤트 삭제
    public void deleteEvent(String eventId) {
        eventRepository.deleteById(eventId);
    }

    // 이벤트 상태 업데이트
    public EventEntity updateEventStatus(String eventId, String status) {
        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        return eventRepository.save(event);
    }
}
