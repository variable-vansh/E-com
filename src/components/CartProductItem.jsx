import { useState } from "react";

export const CartProductItem = ({
  product,
  quantity,
  onQuantityChange,
  isFreeItem = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!product) return null;

  const handleDecrease = () => {
    if (isFreeItem) return; // Free items can't be modified

    if (quantity === 1) {
      setShowConfirmation(true);
    } else {
      onQuantityChange(product.id, "decrease");
    }
  };

  const handleIncrease = () => {
    if (isFreeItem) return; // Free items can't be modified
    onQuantityChange(product.id, "increase");
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
      <div className={`cart-item ${isFreeItem ? "free-item-cart" : ""}`}>
        <div className="product-img">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
        </div>
        <div className="product-text">
          <div className="product-text-left">
            <h3>
              {product.name}
              {isFreeItem && <span className="free-badge">FREE</span>}
            </h3>
            <div className="product-info">
              <span className="product-unit">
                {isFreeItem ? (
                  <>
                    <span className="original-price">
                      ₹{product.originalPrice} per {product.unit}
                    </span>
                    <span className="free-price">FREE</span>
                  </>
                ) : (
                  `₹${product.price} per ${product.unit}`
                )}
              </span>
            </div>
          </div>
          <div className="product-text-right">
            <span className="cart-item-price">
              {isFreeItem ? (
                <span className="free-price">FREE</span>
              ) : (
                `₹${(product.price * quantity).toFixed(2)}`
              )}
            </span>
            <div className="quantity-controls">
              {!isFreeItem ? (
                <>
                  <button className="quantity-btn" onClick={handleDecrease}>
                    −
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button className="quantity-btn" onClick={handleIncrease}>
                    +
                  </button>
                </>
              ) : (
                <span className="quantity-display">1</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && !isFreeItem && (
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
