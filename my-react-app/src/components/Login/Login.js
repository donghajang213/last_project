import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'; // UserContext 가져오기
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    userId: '', // 사용자가 입력한 아이디
    password: '', // 사용자가 입력한 비밀번호
  });
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const { setUser } = useContext(UserContext); // UserContext에서 setUser 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // 기존 데이터를 유지하면서
      [name]: value, // 변경된 필드 업데이트
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!formData.userId || !formData.password) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // API 요청
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 전송
        },
        body: JSON.stringify(formData), // 사용자가 입력한 데이터를 서버로 전송
      });

      if (response.ok) {
        const result = await response.json();
        alert('로그인 성공!'); // 로그인 성공 알림
        console.log('로그인 성공:', result);

        // UserContext에 사용자 정보 업데이트
        setUser({
          userId: result.userId,
          isAdmin: result.isAdmin, // 관리자인지 여부
        });

        // 토큰 저장 (예: 로컬 스토리지)
        localStorage.setItem('authToken', result.token); // 인증 토큰 저장

        // 메인 페이지로 이동
        navigate('/'); // 메인페이지("/")로 리다이렉트
      } else {
        const error = await response.json();
        setErrorMessage(error.message || '로그인 실패. 다시 시도해주세요.'); // 서버에서 받은 오류 메시지
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'); // 네트워크 오류 메시지
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        {/* 아이디 입력 */}
        <label>
          아이디:
          <input
            type="text"
            name="userId"
            value={formData.userId} // 아이디 필드 값
            onChange={handleChange} // 값 변경 핸들러
            className="login-input"
            required
          />
        </label>

        {/* 비밀번호 입력 */}
        <label>
          비밀번호:
          <input
            type="password"
            name="password"
            value={formData.password} // 비밀번호 필드 값
            onChange={handleChange} // 값 변경 핸들러
            className="login-input"
            required
          />
        </label>

        {/* 에러 메시지 출력 */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* 로그인 버튼 */}
        <button type="submit" className="login-submit">
          로그인
        </button>
      </form>

      {/* 회원가입 링크 */}
      <p>
        회원이 아니신가요? <a href="/signup">회원가입</a>
      </p>
    </div>
  );
}

export default Login;
