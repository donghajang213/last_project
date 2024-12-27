import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 헤더 스타일

function Header() {
  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
        <Link to="/">아토피아</Link>
      </div>

      {/* 내비게이션 */}
      <nav>
        <ul className="nav-list">
          <li><Link to="/clinic">클리닉</Link></li>
          <li><Link to="/store">스토어</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
          <li><Link to="/login">로그인</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
