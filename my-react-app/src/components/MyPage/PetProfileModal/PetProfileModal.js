import React, { useState } from 'react';
import './PetProfileModal.css';

function PetProfileModal({ pet, onSave, onDelete, onClose }) {
  const [formData, setFormData] = useState({
    name: pet.name || '',
    breed: pet.breed || '',
    birthYear: pet.birthYear || '',
    birthMonth: pet.birthMonth || '',
    birthDay: pet.birthDay || '',
    gender: pet.gender || '',
    neutered: pet.neutered || '',
    weight: pet.weight || '',
    registrationNumber: pet.registrationNumber || '',
    photo: pet.photo || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSave = () => {
    onSave(formData); // 부모 컴포넌트로 저장된 데이터 전달
    onClose(); // 모달 닫기
  };

  const handleDelete = () => {
    onDelete(pet.id); // 부모 컴포넌트로 삭제 요청 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>프로필 설정</h2>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>품종</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>생일</label>
          <div className="birth-inputs">
            <input
              type="number"
              name="birthYear"
              placeholder="년"
              value={formData.birthYear}
              onChange={handleChange}
            />
            <input
              type="number"
              name="birthMonth"
              placeholder="월"
              value={formData.birthMonth}
              onChange={handleChange}
            />
            <input
              type="number"
              name="birthDay"
              placeholder="일"
              value={formData.birthDay}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>성별</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="남자아이"
                checked={formData.gender === '남자아이'}
                onChange={handleChange}
              />
              남자아이
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="여자아이"
                checked={formData.gender === '여자아이'}
                onChange={handleChange}
              />
              여자아이
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>중성화 여부</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="neutered"
                value="중성화 전"
                checked={formData.neutered === '중성화 전'}
                onChange={handleChange}
              />
              중성화 전
            </label>
            <label>
              <input
                type="radio"
                name="neutered"
                value="중성화 완료"
                checked={formData.neutered === '중성화 완료'}
                onChange={handleChange}
              />
              중성화 완료
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>체중</label>
          <input
            type="number"
            name="weight"
            placeholder="체중 (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>동물등록번호</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>사진</label>
          <input type="file" onChange={handlePhotoChange} />
        </div>
        <div className="button-group">
          <button onClick={handleSave}>저장하기</button>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default PetProfileModal;
