import React from 'react';
import './Best.css';

function Best() {
  const bestProducts = [
    { id: 1, name: "베스트 제품 1", sales: "1,200개", image: "/images/best1.jpg" },
    { id: 2, name: "베스트 제품 2", sales: "1,000개", image: "/images/best2.jpg" },
    { id: 3, name: "베스트 제품 3", sales: "900개", image: "/images/best3.jpg" },
  ];

  return (
    <div className="best-container">
      <h2>베스트 제품</h2>
      <div className="best-grid">
        {bestProducts.map(product => (
          <div key={product.id} className="best-card">
            <img src={product.image} alt={product.name} className="best-image" />
            <h3>{product.name}</h3>
            <p>{product.sales}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Best;
