import React from 'react';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      {/* 배경 동영상 */}
      <div className="background">
        <video autoPlay muted loop className="background-video">
          {/* 동영상 파일 경로는 public 폴더에 저장된 경로를 사용 */}
          <source src="/assets/pet_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        <h1 className="main-title">앱 환경에서 더 편리하게 사용할 수 있습니다.</h1>
        <p className="main-description">
          스마트폰으로 반려동물을 촬영하면 AI가 분석하여 건강 상태를 알려줍니다.
        </p>
        <div className="button-group">
          <button className="app-store-btn">App Store</button>
          <button className="google-play-btn">Google Play</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
