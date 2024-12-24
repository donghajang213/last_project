import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    user_id: '',
    user_pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in:', formData);

    try {
      const response = await fetch('http://172.30.1.35:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('로그인 성공!');
      } else {
        alert(`로그인 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} required />
        </label>
        <label>
          비밀번호:
          <input type="password" name="user_pwd" value={formData.user_pwd} onChange={handleChange} required />
        </label>
        <button type="submit">로그인</button>
      </form>
      <p>
        회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}

export default Login;
