import React from 'react';

function DiseaseRanking() {
  const diseaseData = [
    { name: '피부병', count: 120 },
    { name: '눈 질환', count: 80 },
    { name: '소화기 질환', count: 60 },
    { name: '호흡기 질환', count: 40 },
    { name: '관절염', count: 20 },
    { name: '기타', count: 10 },
  ];

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
