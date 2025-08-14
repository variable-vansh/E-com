import "../styles/ProductCard.css";

export const ProductCard = ({ product, quantity, onQuantityChange }) => (
  <div className="product-card">
    <img
      src={product.image}
      alt={product.name}
      className="product-card-image"
    />
    <div className="product-card-content">
      <h4 className="product-card-name">{product.name}</h4>
      <p className="product-card-unit">{product.unit}</p>
      <p className="product-card-price">₹{product.price}</p>
    </div>
    <div className="product-card-controls">
      {quantity > 0 ? (
        <div className="product-card-quantity-controls">
          <button
            onClick={() => onQuantityChange(product.id, "decrease")}
            className="product-card-quantity-btn"
          >
            -
          </button>
          <span className="product-card-quantity-value">{quantity}</span>
          <button
            onClick={() => onQuantityChange(product.id, "increase")}
            className="product-card-quantity-btn"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => onQuantityChange(product.id, "increase")}
          className="product-card-add-btn"
        >
          ADD
        </button>
      )}
    </div>
  </div>
);
