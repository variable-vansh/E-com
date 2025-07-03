import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.map((mix, index) => (
          <div key={index} className="cart-item">
            <h3>Mix {index + 1}</h3>
            <ul>
              {mix.map((grain) => (
                <li key={grain.id}>
                  {grain.name}: {grain.weight} kg
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
