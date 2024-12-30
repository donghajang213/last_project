import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode'; // 다음 주소 검색 라이브러리
import '../Signup.css';

function SignupForm({ role, title }) {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '', // 기본 주소
    detailAddress: '', // 상세 주소
    gender: '', // 성별
    birthDate: '', // 생년월일
    vetLicense: '', // 수의사 면허
    bankAccount: '', // 은행 계좌
    businessNumber: '', // 사업자 번호
    role: role,
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // 주소 모달 상태
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 주소 선택 핸들러
  const handleCompleteAddress = (data) => {
    setFormData({ ...formData, address: data.address });
    setIsAddressModalOpen(false); // 모달 닫기
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || '회원가입 실패.');
      }
    } catch (error) {
      setErrorMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
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
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="010-1234-5678"
            pattern="^010[-]?[0-9]{4}[-]?[0-9]{4}$"
            required
          />
        </label>

        <label>
          생년월일:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </label>

        {/* 주소 입력 필드 */}
        <label>
          주소:
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="주소를 검색하세요"
            readOnly
            onClick={() => setIsAddressModalOpen(true)} // 모달 열기
            required
          />
        </label>

        {isAddressModalOpen && (
          <div className="address-modal">
            <DaumPostcode onComplete={handleCompleteAddress} />
            <button onClick={() => setIsAddressModalOpen(false)}>닫기</button>
          </div>
        )}

        <label>
          상세 주소:
          <input
            type="text"
            name="detailedAddress"
            value={formData.detailedAddress}
            placeholder="상세 주소를 입력하세요 (선택)"
            onChange={handleChange}
          />
        </label>


        {/* 성별 입력 필드 */}
        <div className="gender-field">
          <label>
            성별:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </label>
        </div>


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

        <button type="submit">회원가입</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default SignupForm;
