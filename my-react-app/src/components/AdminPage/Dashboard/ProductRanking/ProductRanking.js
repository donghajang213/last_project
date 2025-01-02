import React, { useState, useEffect } from 'react';

// 상품 랭킹 컴포넌트
function ProductRanking() {
  const [productData, setProductData] = useState([]); // 상품 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // 백엔드에서 상품 데이터를 가져옴
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rankings/products`);
        if (!response.ok) {
          throw new Error('상품 데이터를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setProductData(data); // 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchProductData();
  }, []);

  if (loading) return <div>로딩 중...</div>; // 로딩 상태 표시
  if (error) return <div>오류 발생: {error}</div>; // 에러 상태 표시

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
