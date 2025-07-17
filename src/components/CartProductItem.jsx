import { useState } from "react";

export const CartProductItem = ({ product, quantity, onQuantityChange }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity === 1) {
      setShowConfirmation(true);
    } else {
      onQuantityChange(product.id, "decrease");
    }
  };

  const handleConfirmRemove = () => {
    onQuantityChange(product.id, "decrease");
    setShowConfirmation(false);
  };

  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };
  return (
    <>
      <div className="cart-item">
        <div className="cart-item-header">
          <h3>{product.name}</h3>
          <span className="cart-item-price">
            ₹{(product.price * quantity).toFixed(2)}
          </span>
        </div>
        <div className="cart-item-details">
          <div className="product-info">
            <span className="product-unit">{product.unit}</span>
            <span className="product-unit-price">
              ₹{product.price} per {product.unit}
            </span>
          </div>
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={handleDecrease}>
              −
            </button>
            <span className="quantity">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(product.id, "increase")}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Remove Item</h3>
            <p>
              Are you sure you want to remove "{product.name}" from your cart?
            </p>
            <div className="confirmation-buttons">
              <button
                className="confirmation-btn cancel"
                onClick={handleCancelRemove}
              >
                Cancel
              </button>
              <button
                className="confirmation-btn confirm"
                onClick={handleConfirmRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
