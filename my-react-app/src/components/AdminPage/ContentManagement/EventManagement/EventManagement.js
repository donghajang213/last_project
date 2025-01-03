import React, { useState, useEffect } from "react";
import "./EventManagement.css";

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventDesc: "",
    startDate: "",
    endDate: "",
    imageFile: null, // 이미지 파일
  });
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/events`);
        if (!response.ok) {
          throw new Error("이벤트를 불러오지 못했습니다.");
        }
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent((prevEvent) => ({ ...prevEvent, imageFile: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // 이미지 데이터를 미리보기로 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async () => {
    try {
      const formData = new FormData();
      formData.append("eventTitle", newEvent.eventTitle);
      formData.append("eventDesc", newEvent.eventDesc);
      formData.append("startDate", newEvent.startDate);
      formData.append("endDate", newEvent.endDate);
      formData.append("imageFile", newEvent.imageFile);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/events`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이벤트를 추가하지 못했습니다.");
      }

      const addedEvent = await response.json();
      setEvents([...events, addedEvent]);
      setNewEvent({ eventTitle: "", eventDesc: "", startDate: "", endDate: "", imageFile: null });
      setPreviewImage(null); // 미리보기 초기화
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/events/${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("이벤트 삭제에 실패했습니다.");
      }
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="event-management">
      <h3>이벤트 관리</h3>
      {error && <p className="error">{error}</p>}

      {/* 이벤트 추가 폼 */}
      <div className="event-form">
        <input
          type="text"
          name="eventTitle"
          placeholder="이벤트 제목"
          value={newEvent.eventTitle}
          onChange={handleInputChange}
        />
        <textarea
          name="eventDesc"
          placeholder="이벤트 설명"
          value={newEvent.eventDesc}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="startDate"
          value={newEvent.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          value={newEvent.endDate}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleAddEvent}>추가</button>
      </div>

      {/* 미리보기 */}
      {previewImage && (
        <div className="event-preview">
          <h4>미리보기</h4>
          <div className="event-card">
            <img src={previewImage} alt="미리보기 이미지" />
            <h4>{newEvent.eventTitle}</h4>
            <p>{newEvent.eventDesc}</p>
            <p>
              {newEvent.startDate} ~ {newEvent.endDate}
            </p>
          </div>
        </div>
      )}

      {/* 이벤트 리스트 */}
      <div className="event-list">
        {events.map((event) => (
          <div key={event.eventId} className="event-card">
            <img src={event.imageUrl} alt="이벤트 이미지" />
            <h4>{event.eventTitle}</h4>
            <p>{event.eventDesc}</p>
            <p>
              {event.startDate} ~ {event.endDate}
            </p>
            <button onClick={() => handleDeleteEvent(event.eventId)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventManagement;
