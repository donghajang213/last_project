import React, { useState } from 'react';

function ProductAdd() {
  const [formData, setFormData] = useState({
    prodCode: '',
    prodName: '',
    prodOriginPrice: '',
    prodSalePrice: '',
    prodCategory: '',
    prodCategoryDetail: '',
    prodDesc: '',
    prodMainImgPath: '',
    prodQuantity: '',
    prodSalesDist: '',
    originId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 상품 등록 API 호출
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('상품 등록 성공!');
        setFormData({
          prodCode: '',
          prodName: '',
          prodOriginPrice: '',
          prodSalePrice: '',
          prodCategory: '',
          prodCategoryDetail: '',
          prodDesc: '',
          prodMainImgPath: '',
          prodQuantity: '',
          prodSalesDist: '',
          originId: '',
        });
      })
      .catch((error) => console.error('상품 등록 실패:', error));
  };

  return (
    <div>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="prodCode" placeholder="상품 코드" value={formData.prodCode} onChange={handleChange} required />
        <input type="text" name="prodName" placeholder="상품명" value={formData.prodName} onChange={handleChange} required />
        <input type="number" name="prodOriginPrice" placeholder="원가" value={formData.prodOriginPrice} onChange={handleChange} required />
        <input type="number" name="prodSalePrice" placeholder="판매가" value={formData.prodSalePrice} onChange={handleChange} required />
        <input type="text" name="prodCategory" placeholder="카테고리" value={formData.prodCategory} onChange={handleChange} required />
        <input type="text" name="prodCategoryDetail" placeholder="상세 카테고리" value={formData.prodCategoryDetail} onChange={handleChange} />
        <textarea name="prodDesc" placeholder="상품 설명" value={formData.prodDesc} onChange={handleChange} required />
        <input type="text" name="prodMainImgPath" placeholder="이미지 경로" value={formData.prodMainImgPath} onChange={handleChange} />
        <input type="number" name="prodQuantity" placeholder="재고" value={formData.prodQuantity} onChange={handleChange} required />
        <input type="text" name="prodSalesDist" placeholder="판매 등록 여부" value={formData.prodSalesDist} onChange={handleChange} />
        <input type="text" name="originId" placeholder="제조사 ID" value={formData.originId} onChange={handleChange} required />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default ProductAdd;
