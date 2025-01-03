package com.example.controller.EventController;

import com.example.entity.EventEntity.EventEntity;
import com.example.service.EventService.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/events")
//@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // 모든 이벤트 조회
    @GetMapping
    public List<EventEntity> getAllEvents() {
        return eventService.getAllEvents();
    }

    // 이벤트 추가
    @PostMapping
    public EventEntity addEvent(@RequestBody EventEntity event) {
        return eventService.addEvent(event);
    }

    // 이벤트 삭제
    @DeleteMapping("/{eventId}")
    public void deleteEvent(@PathVariable String eventId) {
        eventService.deleteEvent(eventId);
    }

    // 이벤트 상태 업데이트
    @PutMapping("/{eventId}/status")
    public EventEntity updateEventStatus(@PathVariable String eventId, @RequestParam String status) {
        return eventService.updateEventStatus(eventId, status);
    }
}
