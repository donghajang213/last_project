import React from 'react';

function VetRanking() {
  const vetData = [
    { name: '김수의사', rating: 4.8 },
    { name: '이수의사', rating: 4.5 },
    { name: '박수의사', rating: 4.3 },
  ];

  return (
    <div>
      <h2>수의사 랭킹</h2>
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
