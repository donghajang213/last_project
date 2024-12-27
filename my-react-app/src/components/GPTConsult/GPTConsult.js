import React, { useState } from 'react';
import './GPTConsult.css';

function GPTConsult() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleConsult = async () => {
    if (!input.trim()) {
      alert('상담 내용을 입력해주세요.');
      return;
    }

    try {
      // 여기에 실제 GPT API 호출 로직 추가 가능
      // 아래는 테스트용 가상 응답 처리
      setResponse('GPT 응답: 반려동물 상태를 확인 중입니다...');
    } catch (error) {
      alert('상담 중 오류가 발생했습니다.');
      console.error('Error during GPT consult:', error);
    }
  };

  return (
    <div className="gpt-consult-container">
      <h2>GPT 상담</h2>
      <textarea
        placeholder="반려동물 상태를 입력해주세요."
        value={input}
        onChange={handleInputChange}
        className="consult-input"
      ></textarea>
      <button onClick={handleConsult} className="consult-submit">
        상담 시작
      </button>
      {response && <p className="gpt-response">{response}</p>}
    </div>
  );
}

export default GPTConsult;
