import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext"; // 사용자 정보 가져오기
import PetRegistrationModal from "./PetRegistrationModal/PetRegistrationModal";
import "./MyPage.css";

function MyPage() {
  const { user } = useContext(UserContext); // 사용자 정보 가져오기
  const [pets, setPets] = useState(user.pets || []); // 사용자 반려동물 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null); // 수정 중인 반려동물 정보
  const [menuOpen, setMenuOpen] = useState(null); // 현재 열려 있는 드롭다운 메뉴 ID

  // 모달 열기
  const handleAddPet = () => {
    setEditingPet(null); // 새로 추가 모드
    setIsModalOpen(true);
  };

  // 수정 모달 열기
  const handleEditPet = (pet) => {
    setEditingPet(pet); // 수정할 반려동물 설정
    setIsModalOpen(true);
    setMenuOpen(null); // 드롭다운 닫기
  };

  // 삭제 처리
  const handleDeletePet = (petId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setPets(pets.filter((pet) => pet.id !== petId));
      setMenuOpen(null); // 드롭다운 닫기
    }
  };

  // 드롭다운 토글
  const toggleMenu = (petId) => {
    setMenuOpen(menuOpen === petId ? null : petId);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 반려동물 저장
  const handleSavePet = (savedPet) => {
    if (editingPet) {
      // 수정 모드
      setPets(
        pets.map((pet) => (pet.id === editingPet.id ? savedPet : pet))
      );
    } else {
      // 새로 추가
      setPets([...pets, { ...savedPet, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mypage-container">
      {/* 상단 사용자 정보 */}
      <div className="mypage-header">
        <h2>{user.name}님의 마이페이지</h2>
        <button className="add-pet-button" onClick={handleAddPet}>
          + 반려동물 등록
        </button>
      </div>

      {/* 반려동물 정보 */}
      <div className="pet-info">
        <h3>{user.name}님의 반려동물</h3>
        <div className="pet-list">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <div className="dropdown-container">
                {/* 점 3개 버튼 */}
                <button
                  className="dropdown-button"
                  onClick={() => toggleMenu(pet.id)}
                >
                  ⋮
                </button>
                {/* 드롭다운 메뉴 */}
                {menuOpen === pet.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEditPet(pet)}>수정</button>
                    <button onClick={() => handleDeletePet(pet.id)}>삭제</button>
                  </div>
                )}
              </div>
              <img
                src={pet.photo || "/images/SamplePet.jpg"}
                alt={pet.name}
                className="pet-photo"
              />
              <p>{pet.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 반려동물 등록/수정 모달 */}
      {isModalOpen && (
        <PetRegistrationModal
          onClose={handleModalClose}
          onSave={handleSavePet}
          pet={editingPet} // 수정 중인 반려동물 전달
        />
      )}
    </div>
  );
}

export default MyPage;
