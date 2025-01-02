import React, { useState, useEffect } from 'react';

function DiseaseRanking() {
  const [diseaseData, setDiseaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rankings/diseases`);
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
      <ul>
        {diseaseData.map((disease, index) => (
          <li key={index}>
            {index + 1}. {disease.name} - {disease.count}건
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiseaseRanking;
