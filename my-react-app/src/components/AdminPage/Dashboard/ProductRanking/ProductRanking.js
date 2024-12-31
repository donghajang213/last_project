import React from 'react';

function ProductRanking() {
  const productData = [
    { name: '강아지 사료', sales: 500 },
    { name: '고양이 사료', sales: 400 },
    { name: '애견 샴푸', sales: 250 },
    { name: '고양이 간식', sales: 200 },
    { name: '강아지 장난감', sales: 150 },
  ];

  return (
    <div>
      <h1>상품 랭킹</h1>
      <ul>
        {productData.map((product, index) => (
          <li key={index}>
            {index + 1}. {product.name} - {product.sales}개 판매
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductRanking;
