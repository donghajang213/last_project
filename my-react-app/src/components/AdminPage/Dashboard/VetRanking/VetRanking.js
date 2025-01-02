import React, { useState, useEffect } from 'react';

function VetRanking() {
  const [vetData, setVetData] = useState([]); // 수의사 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchVetData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rankings/vets`);
        if (!response.ok) {
          throw new Error('수의사 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setVetData(data); // 데이터 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVetData();
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 상태 표시
  if (error) return <div>오류 발생: {error}</div>; // 에러 상태 표시

  return (
    <div>
      <h1>수의사 랭킹</h1>
      <ul>
        {vetData.map((vet, index) => (
          <li key={index}>
            {index + 1}. {vet.name} - 평점 {vet.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VetRanking;
