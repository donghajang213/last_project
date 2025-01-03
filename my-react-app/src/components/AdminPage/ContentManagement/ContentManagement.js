import React, { useState, useEffect } from "react";
import "./ContentManagement.css";

function ContentManagement() {
  const [contents, setContents] = useState({
    banners: [],
    events: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/contents`);
        if (!response.ok) {
          throw new Error("콘텐츠를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setContents({
          banners: Array.isArray(data.banners) ? data.banners : [],
          events: Array.isArray(data.events) ? data.events : [],
        });
      } catch (err) {
        setError(err.message);
      }
    }
    fetchContents();
  }, []);

  const handleDeleteBanner = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/banners/${id}`, { method: "DELETE" });
      setContents((prev) => ({
        ...prev,
        banners: prev.banners.filter((banner) => banner.id !== id),
      }));
    } catch (err) {
      console.error("배너 삭제 실패:", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/events/${id}`, { method: "DELETE" });
      setContents((prev) => ({
        ...prev,
        events: prev.events.filter((event) => event.id !== id),
      }));
    } catch (err) {
      console.error("이벤트 삭제 실패:", err);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const ongoingBanners = contents.banners.filter(
    (banner) => banner.startDate <= currentDate && banner.endDate >= currentDate
  );
  const ongoingEvents = contents.events.filter(
    (event) => event.startDate <= currentDate && event.endDate >= currentDate
  );

  return (
    <div className="content-management">
      <h2>콘텐츠 관리</h2>
      {error && <p className="error">{error}</p>}

      {/* 진행 중인 배너 */}
      <section>
        <h3>진행 중인 배너</h3>
        <div className="banner-slider">
          {ongoingBanners.map((banner) => (
            <div key={banner.id} className="banner-card">
              <img src={banner.imageUrl} alt="배너 이미지" />
              <p>우선순위: {banner.priority}</p>
              <button onClick={() => handleDeleteBanner(banner.id)}>삭제</button>
            </div>
          ))}
        </div>
      </section>

      {/* 진행 중인 이벤트 */}
      <section>
        <h3>진행 중인 이벤트</h3>
        <div className="event-list">
          {ongoingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p>
                기간: {event.startDate} ~ {event.endDate}
              </p>
              <button onClick={() => handleDeleteEvent(event.id)}>삭제</button>
              <button
                onClick={() =>
                  setContents((prev) => ({
                    ...prev,
                    events: prev.events.map((e) =>
                      e.id === event.id ? { ...e, endDate: currentDate } : e
                    ),
                  }))
                }
              >
                종료
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ContentManagement;
