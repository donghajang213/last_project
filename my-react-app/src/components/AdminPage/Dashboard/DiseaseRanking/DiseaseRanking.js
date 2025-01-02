import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function DiseaseRanking() {
  const [diseaseData, setDiseaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ranking/disease`);
        if (!response.ok) {
          throw new Error('질병 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setDiseaseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseaseData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <h1>질병 랭킹</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={diseaseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="diseaseName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="casesCount" fill="#82ca9d" name="사례 수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DiseaseRanking;
