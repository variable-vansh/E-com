import React, { useState } from "react";

const Cart = ({ cart, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddress = () => {
    setIsAddressOpen(!isAddressOpen);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, mix) => {
      return (
        total +
        mix.reduce((mixTotal, grain) => {
          return mixTotal + grain.weight * grain.price;
        }, 0)
      );
    }, 0);
  };

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="cart-header" onClick={toggleCart}>
        <h2>Cart ({cart.length})</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((mix, index) => (
            <div key={index} className="cart-item">
              <h3>Mix {index + 1}</h3>
              <ul>
                {mix.map((grain) => (
                  <li key={grain.id}>
                    {grain.name}: {grain.weight} kg - ₹
                    {grain.weight * grain.price}
                  </li>
                ))}
              </ul>
              <button onClick={() => removeFromCart(index)}>🗑️</button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: ₹{calculateTotalPrice().toFixed(2)}</h3>
        </div>
        <div className="shipping-address">
          {!isAddressOpen && (
            <button onClick={toggleAddress} className="checkout-button">
              Add Address and Checkout
            </button>
          )}
          {isAddressOpen && (
            <form className="checkout-form">
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Postal Code" />
              <button type="submit">Checkout</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
