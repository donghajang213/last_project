import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import './Store.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Store() {
  const location = useLocation();
  const isHome = location.pathname === '/store';

  const [searchQuery, setSearchQuery] = useState('');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality to be implemented with backend API
    alert(`검색어: ${searchQuery}`);
  };

  return (
    <div className="store-container">
      <header className="store-header">
        <div className="store-nav">
          <ul className="nav-links">
            <li><Link to="/store">스토어 홈</Link></li>
            <li><Link to="/store/products">전체 제품</Link></li>
            <li><Link to="/store/best">베스트</Link></li>
            <li><Link to="/store/event">이벤트</Link></li>
          </ul>
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

      {isHome && (
        <section className="banner-slider">
          <Slider {...sliderSettings}>
            <div>
              <img src="/images/banner1.jpg" alt="배너 1" className="slider-image" />
            </div>
            <div>
              <img src="/images/banner2.jpg" alt="배너 2" className="slider-image" />
            </div>
            <div>
              <img src="/images/banner3.jpg" alt="배너 3" className="slider-image" />
            </div>
          </Slider>
        </section>
      )}

      <section className="store-main">
        <Outlet />
      </section>
    </div>
  );
}

export default Store;