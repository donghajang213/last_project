// MyPage.js
import React from 'react';
import './MyPage.css';

function MyPage() {
  return (
    <div className="mypage-container">
      {/* 상단 사용자 정보 */}
      <div className="user-info">
        <h2>김건이님의 마이페이지</h2>
        <div className="user-stats">
          <div>
            <p>건강체크</p>
            <p>0회</p>
          </div>
          <div>
            <p>상담권</p>
            <p>0개</p>
          </div>
          <div>
            <p>멤버십</p>
            <button>멤버십 가입 ></button>
          </div>
          <div>
            <p>쿠폰</p>
            <p>0개</p>
          </div>
          <div>
            <p>적립금</p>
            <p>0P</p>
          </div>
        </div>
      </div>

      {/* 반려동물 정보 */}
      <div className="pet-info">
        <h3>김건이님의 반려동물</h3>
        <div className="pet-list">
          <div className="pet-card">
            <img src="/images/sample-pet.jpg" alt="반려동물" />
            <p>대한</p>
          </div>
          <div className="add-pet-card">
            <button>+ 프로필 추가</button>
          </div>
        </div>
      </div>

      {/* 찜한 제품 */}
      <div className="favorite-products">
        <h3>찜한 제품</h3>
        <div className="product-list">
          <p>찜한 제품이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
