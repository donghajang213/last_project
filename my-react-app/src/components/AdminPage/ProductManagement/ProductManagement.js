import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);
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
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기
  const [imageFile, setImageFile] = useState(null); // 업로드할 이미지 파일
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // 초기 데이터 로드
  useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('상품 데이터 가져오기 실패:', error));
  }, []);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 상품 등록/수정 핸들러
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();

    let imagePath = formData.prodMainImgPath;

    // 이미지 업로드 처리
    if (imageFile) {
      const imageData = new FormData();
      imageData.append('image', imageFile);

      try {
        const response = await fetch('/upload', { // 이미지 업로드 엔드포인트
          method: 'POST',
          body: imageData,
        });

        if (response.ok) {
          const data = await response.json();
          imagePath = data.imagePath;
        } else {
          console.error('이미지 업로드 실패');
        }
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      }
    }

    const productData = { ...formData, prodMainImgPath: imagePath };
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/products/${editProductId}` : '/products';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (isEditing) {
          setProducts(products.map((prod) => (prod.prodId === editProductId ? data : prod)));
          setIsEditing(false);
        } else {
          setProducts([...products, data]);
        }
        resetForm();
      })
      .catch((error) => console.error('상품 등록/수정 실패:', error));
  };

  // 폼 초기화
  const resetForm = () => {
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
    setImagePreview(null);
    setImageFile(null);
  };

  // 상품 수정 핸들러
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditProductId(product.prodId);
    setFormData({ ...product });
    setImagePreview(product.prodMainImgPath); // 기존 이미지 미리보기 설정
  };

  // 상품 삭제 핸들러
  const handleDeleteProduct = (prodId) => {
    fetch(`/products/${prodId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter((product) => product.prodId !== prodId));
      })
      .catch((error) => console.error('상품 삭제 실패:', error));
  };

  return (
    <div className="product-management">
      <h2>상품 관리</h2>

      {/* 상품 등록/수정 폼 */}
      <form onSubmit={handleAddOrUpdateProduct} className="product-form">
        <input type="text" name="prodCode" placeholder="상품 코드" value={formData.prodCode} onChange={handleChange} required />
        <input type="text" name="prodName" placeholder="상품명" value={formData.prodName} onChange={handleChange} required />
        <input type="number" name="prodOriginPrice" placeholder="원가" value={formData.prodOriginPrice} onChange={handleChange} required />
        <input type="number" name="prodSalePrice" placeholder="판매가" value={formData.prodSalePrice} onChange={handleChange} required />
        <input type="text" name="prodCategory" placeholder="상품 분류" value={formData.prodCategory} onChange={handleChange} required />
        <input type="text" name="prodCategoryDetail" placeholder="상품 상세 분류" value={formData.prodCategoryDetail} onChange={handleChange} />
        <textarea name="prodDesc" placeholder="상품 설명" value={formData.prodDesc} onChange={handleChange} required></textarea>
        <input type="number" name="prodQuantity" placeholder="재고" value={formData.prodQuantity} onChange={handleChange} required />
        <input type="text" name="prodSalesDist" placeholder="판매 등록 여부" value={formData.prodSalesDist} onChange={handleChange} required />
        <input type="text" name="originId" placeholder="제조사 ID" value={formData.originId} onChange={handleChange} required />

        {/* 이미지 업로드 */}
        <div className="image-upload">
          <label>상품 이미지:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imagePreview && <img src={imagePreview} alt="미리보기" className="image-preview" />}
        </div>

        <button type="submit">{isEditing ? '수정 완료' : '상품 등록'}</button>
      </form>

      {/* 상품 목록 */}
      <table className="product-table">
        <thead>
          <tr>
            <th>상품 코드</th>
            <th>상품명</th>
            <th>원가</th>
            <th>판매가</th>
            <th>분류</th>
            <th>재고</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.prodId}>
              <td>{product.prodCode}</td>
              <td>{product.prodName}</td>
              <td>{product.prodOriginPrice}</td>
              <td>{product.prodSalePrice}</td>
              <td>{product.prodCategory}</td>
              <td>{product.prodQuantity}</td>
              <td>
                <button onClick={() => handleEditProduct(product)}>수정</button>
                <button onClick={() => handleDeleteProduct(product.prodId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
