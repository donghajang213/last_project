import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include', // 세션 쿠키를 저장
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); // 유저 정보 저장
        alert('로그인 성공!');
        navigate('/');
      } else {
        setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setErrorMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-submit">로그인</button>
      </form>
      <p>회원이 아니신가요? <a href="/signup">회원가입</a></p>
    </div>
  );
}

export default Login;

