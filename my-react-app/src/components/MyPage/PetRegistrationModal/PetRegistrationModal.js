import React, { useState } from "react";
import "./PetRegistrationModal.css";

function PetRegistrationModal({ onClose, onSave, pet }) {
  const [formData, setFormData] = useState(
    pet || {
      name: "",
      breed: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "",
      neutered: "",
      weight: "",
      registrationNumber: "",
      photo: null,
    }
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // 저장
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{pet ? "프로필 수정" : "프로필 등록"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* 반려동물 사진 업로드 */}
          <div className="photo-upload">
            <label htmlFor="photo-input" className="photo-label">
              {formData.photo ? (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="반려동물"
                  className="preview-photo"
                />
              ) : (
                <div className="photo-placeholder">+</div>
              )}
            </label>
            <input
              type="file"
              id="photo-input"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="photo-input"
            />
          </div>

          {/* 이름 */}
          <label className="form-label">
            이름
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="반려동물 이름"
              className="form-input"
              required
            />
          </label>

          {/* 품종 */}
          <label className="form-label">
            품종
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">품종을 선택하세요</option>
              <option value="믹스">믹스</option>
              <option value="말티즈">말티즈</option>
              <option value="푸들">푸들</option>
              <option value="시바견">시바견</option>
              {/* 추가 가능 */}
            </select>
          </label>

          {/* 생일 */}
          <label className="form-label">
            생일
            <div className="birth-inputs">
              <input
                type="number"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                placeholder="YYYY"
                className="form-input birth-input"
              />
              <input
                type="number"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                placeholder="MM"
                className="form-input birth-input"
              />
              <input
                type="number"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                placeholder="DD"
                className="form-input birth-input"
              />
            </div>
          </label>

          {/* 성별 */}
          <label className="form-label">
            성별
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="남자아이"
                  checked={formData.gender === "남자아이"}
                  onChange={handleChange}
                />
                남자아이
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="여자아이"
                  checked={formData.gender === "여자아이"}
                  onChange={handleChange}
                />
                여자아이
              </label>
            </div>
          </label>

          {/* 중성화 */}
          <label className="form-label">
            중성화 여부
            <div className="neuter-options">
              <label>
                <input
                  type="radio"
                  name="neutered"
                  value="중성화 전"
                  checked={formData.neutered === "중성화 전"}
                  onChange={handleChange}
                />
                중성화 전
              </label>
              <label>
                <input
                  type="radio"
                  name="neutered"
                  value="중성화 완료"
                  checked={formData.neutered === "중성화 완료"}
                  onChange={handleChange}
                />
                중성화 완료
              </label>
            </div>
          </label>

          {/* 체중 */}
          <label className="form-label">
            체중 (kg)
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="체중 입력"
              className="form-input"
            />
          </label>

          {/* 등록번호 */}
          <label className="form-label">
            등록번호
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="선택 입력"
              className="form-input"
            />
          </label>

          {/* 저장 버튼 */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-button">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetRegistrationModal;
