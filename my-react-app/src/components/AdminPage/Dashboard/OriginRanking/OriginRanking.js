import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function OriginRanking() {
  const [originData, setOriginData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOriginData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ranking/origin`);
        if (!response.ok) {
          throw new Error('제조사 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setOriginData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOriginData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <h1>제조사 랭킹</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={originData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="originName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="originSales" fill="#8884d8" name="판매량" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OriginRanking;
