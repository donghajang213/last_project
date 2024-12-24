import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">아토피아</Link> {/* 로고 클릭 시 메인으로 이동 */}
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/clinic">클리닉</Link></li> {/* 클리닉 페이지로 이동 */}
          <li><Link to="/store">스토어</Link></li> {/* 스토어 페이지로 이동 */}
          <li><Link to="/mypage">마이페이지</Link></li> {/* 마이페이지로 이동 */}
          <li><Link to="/login">로그인</Link></li> {/* 로그인 페이지로 이동 */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
