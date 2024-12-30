import React from 'react';
import './Cart.css';

function Cart() {
  const cartItems = [
    { id: 1, name: "상품 1", price: "10,000원", image: "/images/product1.jpg" },
    { id: 2, name: "상품 2", price: "20,000원", image: "/images/product2.jpg" },
  ];

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
