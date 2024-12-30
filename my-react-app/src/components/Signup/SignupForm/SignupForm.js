import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import '../Signup.css';

function SignupForm({ role, title }) {
  // 회원가입 폼 데이터를 관리하는 상태
  const [formData, setFormData] = useState({
    userId: '', // 사용자 아이디
    password: '', // 비밀번호
    name: '', // 사용자 이름
    email: '', // 이메일 주소
    phoneNumber: '', // 전화번호
    address: '', // 사용자 주소
    vetLicense: '', // 수의사 인증번호 (수의사 가입 시 필요)
    bankAccount: '', // 수의사 계좌번호 (수의사 가입 시 필요)
    businessNumber: '', // 판매자 사업자 번호 (판매자 가입 시 필요)
    role: role, // 사용자 역할 (일반, 수의사, 판매자 중 하나)
  });

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 사용자가 입력한 값을 formData 상태에 업데이트
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      // 서버로 회원가입 요청 보내기
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: 'POST', // POST 메서드 사용
        headers: {
          'Content-Type': 'application/json', // JSON 데이터 전송
        },
        body: JSON.stringify(formData), // 폼 데이터를 JSON 형식으로 변환
      });

      if (response.ok) {
        // 요청 성공 시 성공 메시지 표시 후 로그인 페이지로 이동
        setSuccessMessage('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 2000); // 2초 후 리다이렉트
      } else {
        // 요청 실패 시 서버에서 받은 에러 메시지 표시
        const error = await response.json();
        setErrorMessage(error.message || '회원가입 실패.');
      }
    } catch (error) {
      // 네트워크 오류 또는 서버 오류 처리
      setErrorMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      {/* 역할에 따라 동적으로 제목 표시 */}
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {/* 기본 입력 필드 */}
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
          이메일:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          전화번호:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          주소:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        {/* 수의사 가입 추가 필드 */}
        {role === 'vet' && (
          <>
            <label>
              수의사 인증번호:
              <input type="text" name="vetLicense" value={formData.vetLicense} onChange={handleChange} required />
            </label>
            <label>
              계좌번호:
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required />
            </label>
          </>
        )}

        {/* 판매자 가입 추가 필드 */}
        {role === 'seller' && (
          <label>
            사업자 번호:
            <input type="text" name="businessNumber" value={formData.businessNumber} onChange={handleChange} required />
          </label>
        )}

        {/* 회원가입 버튼 */}
        <button type="submit">회원가입</button>
      </form>

      {/* 에러 메시지 출력 */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* 성공 메시지 출력 */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default SignupForm;
