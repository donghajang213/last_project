import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import PetRegistrationModal from './PetRegistrationModal/PetRegistrationModal';
import './MyPage.css';

function MyPage() {
  const { user } = useContext(UserContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/pets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setPets(data))
        .catch((error) => console.error('반려동물 정보 가져오기 실패:', error));
    }
  }, [user]);

  const handlePetAdd = (newPet) => setPets([...pets, newPet]);
  const handlePetDelete = (petId) => setPets(pets.filter((pet) => pet.id !== petId));

  return (
    <div className="mypage-container">
      {user && <h2>{user.name}님의 마이페이지</h2>}
      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <p>{pet.name}</p>
            <button onClick={() => handlePetDelete(pet.id)}>삭제</button>
          </div>
        ))}
        <PetRegistrationModal onAdd={handlePetAdd} />
      </div>
    </div>
  );
}

export default MyPage;
