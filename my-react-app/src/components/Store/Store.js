import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import './Store.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Store() {
  const location = useLocation();
  const isHome = location.pathname === '/store'; // 현재 경로가 스토어 홈인지 확인
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리
  const [banners, setBanners] = useState([]); // 배너 데이터 상태 관리

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // 배너 데이터 가져오기 (백엔드와 연동)
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/banners`);
        const data = await response.json();
        setBanners(data); // 배너 데이터 설정
      } catch (error) {
        console.error('배너 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchBanners();
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault();
    // 백엔드와 연동하여 검색 기능 구현 필요
    alert(`검색어: ${searchQuery}`);
  };

  return (
    <div className="store-container">
      {/* 스토어 헤더 */}
      <header className="store-header">
        <div className="store-nav">
          {/* 스토어 내비게이션 */}
          <ul className="nav-links">
            <li><Link to="/store">스토어 홈</Link></li>
            <li><Link to="/store/products">전체 제품</Link></li>
            <li><Link to="/store/best">베스트</Link></li>
            <li><Link to="/store/event">이벤트</Link></li>
          </ul>
          {/* 검색 및 장바구니 */}
          <div className="store-actions">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">검색</button>
            </form>
            <Link to="/store/cart" className="cart-button">장바구니</Link>
          </div>
        </div>
      </header>

      {/* 배너 슬라이더 */}
      {isHome && banners.length > 0 && (
        <section className="banner-slider">
          <Slider {...sliderSettings}>
            {banners.map((banner, index) => (
              <div key={index}>
                <img
                  src={banner.imagePath} // 배너 이미지 경로
                  alt={`배너 ${index + 1}`}
                  className="slider-image"
                />
              </div>
            ))}
          </Slider>
        </section>
      )}

      {/* 스토어 메인 콘텐츠 */}
      <section className="store-main">
        <Outlet />
      </section>
    </div>
  );
}

export default Store;
