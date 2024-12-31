import React from 'react';

function OriginRanking() {
  const originData = [
    { name: '강아지월드', sales: 1200 },
    { name: '고양이사랑', sales: 1000 },
    { name: '펫토이코', sales: 800 },
    { name: '반려용품샵', sales: 600 },
    { name: '펫케어', sales: 500 },
  ];

  return (
    <div>
      <h1>제조사 랭킹</h1>
      <ul>
        {originData.map((origin, index) => (
          <li key={index}>
            {index + 1}. {origin.name} - {origin.sales}개 판매
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OriginRanking;
