import React, { useState, useEffect } from 'react';

function ProductDetail() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('상품 데이터 불러오기 실패:', error));
  }, []);

  return (
    <div>
      <h2>상품 상세 정보</h2>
      <table>
        <thead>
          <tr>
            <th>상품 코드</th>
            <th>상품명</th>
            <th>카테고리</th>
            <th>원가</th>
            <th>판매가</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.prodId}>
              <td>{product.prodCode}</td>
              <td>{product.prodName}</td>
              <td>{product.prodCategory}</td>
              <td>{product.prodOriginPrice}</td>
              <td>{product.prodSalePrice}</td>
              <td>{product.prodQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetail;
