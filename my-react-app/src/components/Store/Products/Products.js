import React from 'react';
import './Products.css';

function Products() {
  const products = [
    { id: 1, name: "제품 1", price: "10,000원", image: "/images/product1.jpg" },
    { id: 2, name: "제품 2", price: "20,000원", image: "/images/product2.jpg" },
    { id: 3, name: "제품 3", price: "15,000원", image: "/images/product3.jpg" },
  ];

  return (
    <div className="products-container">
      <h2>전체 제품</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
