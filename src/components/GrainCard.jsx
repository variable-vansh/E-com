import { getGrainColorClass } from "../utils/colorUtils";
import "../styles/GrainCard.css";

export const GrainCard = ({
  grain,
  quantity,
  onQuantityChange,
  cardIndex = 0,
  isVisible = true,
}) => {
  const isHiddenCard = cardIndex >= 9;

  return (
    <div
      className={`grain-card ${getGrainColorClass(grain.name, "grain-card")} ${
        isHiddenCard ? "grain-card-hidden" : ""
      } ${isVisible ? "grain-card-visible" : ""}`}
      style={{
        "--card-index": cardIndex,
        "--reveal-delay": isHiddenCard ? `${(cardIndex - 9) * 0.1}s` : "0s",
      }}
    >
      <img src={grain.image} alt={grain.name} className="grain-card-image" />
      <div className="grain-card-content">
        <div className="grain-card-header">
          <h4 className="grain-card-name">{grain.name}</h4>
        </div>
        <p className="grain-card-price">₹{grain.price}/kg</p>
        <div className="grain-card-controls">
          <div className="grain-card-quantity">
            <button
              onClick={() => onQuantityChange(grain.id, "decrease")}
              className="grain-card-btn grain-card-btn-decrease"
            >
              -
            </button>
            <span className="grain-card-quantity-value">{quantity}</span>
            <button
              onClick={() => onQuantityChange(grain.id, "increase")}
              className="grain-card-btn grain-card-btn-increase"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
