import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Header.css';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('로그아웃되었습니다.');
    localStorage.removeItem('authToken'); // 인증 토큰 삭제
    setUser(null); // 전역 상태 초기화
    navigate('/'); // 메인 페이지로 리다이렉트
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">아토피아</Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/clinic/">클리닉</Link></li>
          <li><Link to="/store">스토어</Link></li>
          <li>
              {user ? (
                <Link to="/mypage">마이페이지</Link>
              ) : (
                <Link to="/login" onClick={() => alert('로그인이 필요합니다.')}>마이페이지</Link>
              )}
          </li>
          {user && user.userRole === 'admin' && (
            <li><Link to="/admin">관리자</Link></li> // 관리자 전용 버튼
          )}
          {user ? (
            <li>
              <button onClick={handleLogout} className="nav-button">
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
