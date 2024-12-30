import React, { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './GPTConsult.css';

function GPTConsult() {
  const { user } = useContext(UserContext); // 로그인 상태 확인
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);

  // 로그인 확인: 로그인하지 않은 사용자는 리다이렉트
  if (!user) {
    alert('이 서비스는 로그인 후 이용할 수 있습니다.');
    navigate('/login');
    return null;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // 이미지 미리보기
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedImage) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    try {
      const response = await fetch('http://your-api-url/api/gpt-consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: uploadedImage }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('GPT 상담 결과: ' + result.message);
      } else {
        alert('GPT 상담 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('GPT 상담 오류:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="gpt-consult-container">
      <h2>GPT 상담</h2>
      <p>이미지를 업로드하여 반려동물에 대한 상담을 진행하세요.</p>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && <img src={uploadedImage} alt="미리보기" className="uploaded-image" />}
      <button className="consult-submit" onClick={handleSubmit}>
        상담 요청
      </button>
    </div>
  );
}

export default GPTConsult;
