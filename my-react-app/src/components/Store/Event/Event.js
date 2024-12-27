import React from 'react';
import './Event.css';

function Event() {
  // 이벤트 데이터 (예시 데이터)
  const events = {
    ongoing: [
      { id: 1, title: "신규 회원 가입 이벤트", description: "회원 가입하고 할인 쿠폰 받기", image: "/images/event1.jpg" },
      { id: 2, title: "여름 세일", description: "최대 50% 할인", image: "/images/event2.jpg" },
    ],
    ended: [
      { id: 3, title: "봄맞이 할인", description: "봄맞이 특별 할인 이벤트", image: "/images/event3.jpg" },
      { id: 4, title: "크리스마스 이벤트", description: "특별 기념품 증정", image: "/images/event4.jpg" },
    ],
  };

  return (
    <div className="event-container">
      <h2>진행 중인 이벤트</h2>
      <div className="event-grid">
        {events.ongoing.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      <h2>종료된 이벤트</h2>
      <div className="event-grid">
        {events.ended.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;
