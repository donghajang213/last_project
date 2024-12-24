import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">아토피아</div>
      <nav>
        <ul className="nav-list">
          <li><a href="#clinic">클리닉</a></li>
          <li><a href="#store">스토어</a></li>
          <li><a href="#mypage">마이페이지</a></li>
          <li><a href="#login">로그인</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
