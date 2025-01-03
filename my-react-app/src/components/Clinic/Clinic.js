import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Clinic.css';
import { UserContext } from '../../contexts/UserContext'; // 로그인 상태 확인용 Context

function Clinic() {
  const { user } = useContext(UserContext); // 로그인 상태 가져오기
  const navigate = useNavigate();

  const handleProtectedAccess = (path) => {
    if (!user) {
      alert('이 서비스는 로그인 후 이용할 수 있습니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } else {
      navigate(path); // 서비스 페이지로 이동
    }
  };

  return (
    <div className="clinic-container">
      <h2>클리닉</h2>
      <div className="options">
        {/* 수의사 상담 */}
        <div className="option">
          <img src="/images/vet_consult.png" alt="수의사 상담" className="option-image" />
          <button className="option-button" onClick={() => handleProtectedAccess('/clinic/vetselect')}>
            수의사 상담
          </button>
        </div>
        {/* GPT 상담 */}
        <div className="option">
          <img src="/images/gpt_consult.png" alt="GPT 상담" className="option-image" />
          <button className="option-button" onClick={() => handleProtectedAccess('/clinic/gpt')}>
            GPT 상담
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clinic;
