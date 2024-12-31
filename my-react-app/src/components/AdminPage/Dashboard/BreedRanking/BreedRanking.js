import React from 'react';

function BreedRanking() {
  const breedData = [
    { breed: '푸들', count: 150 },
    { breed: '치와와', count: 120 },
    { breed: '말티즈', count: 100 },
    { breed: '골든 리트리버', count: 80 },
    { breed: '시바 이누', count: 60 },
  ];

  return (
    <div>
      <h1>품종 랭킹</h1>
      <ul>
        {breedData.map((data, index) => (
          <li key={index}>
            {index + 1}. {data.breed} - {data.count}건
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreedRanking;
