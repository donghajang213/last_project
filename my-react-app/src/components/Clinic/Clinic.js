import React from 'react';
import { Link } from 'react-router-dom';
import './Clinic.css';

function Clinic() {
  return (
    <div className="clinic-container">
      <h2>클리닉</h2>
      <div className="options">
        <div className="option">
          <img src="/images/vet_consult.png" alt="수의사 상담" className="option-image" />
          <Link to="/clinic/vet">
            <button className="option-button">수의사 상담</button>
          </Link>
        </div>
        <div className="option">
          <img src="/images/gpt_consult.png" alt="GPT 상담" className="option-image" />
          <Link to="/clinic/gpt">
            <button className="option-button">GPT 상담</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Clinic;
