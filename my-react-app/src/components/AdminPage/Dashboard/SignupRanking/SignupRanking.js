import React, { useState, useEffect } from 'react';

// 회원가입 랭킹 컴포넌트
function SignupRanking() {
  const [signupData, setSignupData] = useState([]); // 회원가입 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        // 백엔드에서 회원가입 데이터를 가져옴
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rankings/signup`);
        if (!response.ok) {
          throw new Error('회원가입 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setSignupData(data); // 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchSignupData();
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 상태 표시
  if (error) return <div>오류 발생: {error}</div>; // 에러 상태 표시

  return (
    <div>
      <h1>회원가입 랭킹</h1>
      <ul>
        {signupData.map((data, index) => (
          <li key={index}>
            {index + 1}. {data.month} - {data.count}명
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignupRanking;
