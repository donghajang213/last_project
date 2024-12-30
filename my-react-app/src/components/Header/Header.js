import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Header.css';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">아토피아</Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/clinic">클리닉</Link></li>
          <li><Link to="/store">스토어</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
          {user && user.isAdmin && (
            <li><Link to="/admin">관리자</Link></li> // 관리자 버튼
          )}
          {user ? (
            <li>
              <button
                onClick={() => {
                  alert('로그아웃되었습니다.');
                  localStorage.removeItem('authToken'); // 인증 토큰 삭제
                  window.location.reload(); // 페이지 새로고침
                }}
              >>
                로그아웃
              </button>
            </li>
          ) : (
            <li><Link to="/login">로그인</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
