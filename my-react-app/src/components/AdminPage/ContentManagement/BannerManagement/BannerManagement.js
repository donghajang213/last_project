import React, { useState, useEffect } from "react";
import "./BannerManagement.css";

function BannerManagement() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({
    imageUrl: "",
    redirectUrl: "",
    priority: 1,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/banners`);
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setBanners(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchBanners();
  }, []);

  const handleInputChange = (e) => {
    setNewBanner({ ...newBanner, [e.target.name]: e.target.value });
  };

  const handleAddBanner = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/banners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBanner),
      });
      if (!response.ok) {
        throw new Error("Failed to add banner");
      }
      const addedBanner = await response.json();
      setBanners([...banners, addedBanner]);
      setNewBanner({ imageUrl: "", redirectUrl: "", priority: 1 });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/banners/${bannerId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }
      setBanners(banners.filter((banner) => banner.id !== bannerId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="banner-management">
      <h3>배너 관리</h3>
      {error && <p className="error">{error}</p>}

      {/* 배너 추가 폼 */}
      <div className="banner-form">
        <input
          type="text"
          name="imageUrl"
          placeholder="배너 이미지 URL"
          value={newBanner.imageUrl}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="redirectUrl"
          placeholder="클릭 시 이동할 URL"
          value={newBanner.redirectUrl}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="priority"
          placeholder="우선순위"
          value={newBanner.priority}
          onChange={handleInputChange}
        />
        <button onClick={handleAddBanner}>추가</button>
      </div>

      {/* 미리보기 */}
      {newBanner.imageUrl && (
        <div className="banner-preview">
          <h4>미리보기</h4>
          <div className="banner-card">
            <img src={newBanner.imageUrl} alt="미리보기 이미지" />
            <p>URL: {newBanner.redirectUrl}</p>
            <p>우선순위: {newBanner.priority}</p>
          </div>
        </div>
      )}

      {/* 배너 리스트 */}
      <div className="banner-list">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-card">
            <img src={banner.imageUrl} alt="배너 이미지" />
            <p>URL: {banner.redirectUrl}</p>
            <p>우선순위: {banner.priority}</p>
            <button onClick={() => handleDeleteBanner(banner.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerManagement;
