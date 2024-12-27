import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트를 위한 훅
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    address: '',
    detailedAddress: '',
    gender: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

    // 필수 필드 트림 처리
    const trimmedData = {
      ...formData,
      userId: formData.userId.trim(),
      password: formData.password.trim(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
    };

    // 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;

    if (!emailRegex.test(trimmedData.email)) {
      setErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (!phoneRegex.test(trimmedData.phoneNumber)) {
      setErrorMessage('유효한 전화번호를 입력해주세요. 예: 010-1234-5678');
      return;
    }

    const requiredFields = ['userId', 'password', 'name', 'email'];
    for (let field of requiredFields) {
      if (!trimmedData[field]) {
        setErrorMessage('필수 입력 항목을 모두 입력해주세요.');
        return;
      }
    }

    try {
      // API 호출
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData),
      });

      if (response.ok) {
        setSuccessMessage('회원가입 성공! 잠시 후 로그인 페이지로 이동합니다.');
        setErrorMessage('');
        setTimeout(() => navigate('/login'), 3000); // 3초 후 로그인 페이지로 이동
      } else {
        const error = await response.json();
        setErrorMessage('회원가입 실패: ' + (error.message || '알 수 없는 오류'));
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
      setSuccessMessage('');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
        </label>
        <label>
          비밀번호:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          이름:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          생년월일:
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        </label>
        <label>
          이메일:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          전화번호:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          주소:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          상세 주소:
          <input type="text" name="detailedAddress" value={formData.detailedAddress} onChange={handleChange} />
        </label>
        <label>
          성별:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>
        <button type="submit">회원가입</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Signup;
