import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// 품종 랭킹 컴포넌트
function BreedRanking() {
  const [breedData, setBreedData] = useState([]); // 품종 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchBreedData = async () => {
      try {
        // 백엔드에서 품종 랭킹 데이터를 가져옴
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ranking/breed`);
        if (!response.ok) {
          throw new Error('품종 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setBreedData(data); // 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchBreedData();
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 상태 표시
  if (error) return <div>오류 발생: {error}</div>; // 에러 상태 표시

  return (
    <div>
      <h1>품종 랭킹</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={breedData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="dogCategory" type="category" />
          <Tooltip />
          <Bar dataKey="casesCount" fill="#8884d8" name="건수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BreedRanking;
