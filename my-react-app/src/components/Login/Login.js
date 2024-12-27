import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트를 위한 훅
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const navigate = useNavigate(); // 리다이렉트 함수

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('로그인 성공!');
        console.log('로그인 성공:', result);

        // 토큰 저장 (예: 로컬 스토리지)
        localStorage.setItem('authToken', result.token);

        // 대시보드로 리다이렉트
        navigate('/dashboard');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || '로그인 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
            value={formData.userId}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
