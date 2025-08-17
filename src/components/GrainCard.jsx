import { useState, useEffect } from "react";
import { getGrainColorClass } from "../utils/colorUtils";
import "../styles/GrainCard.css";

export const GrainCard = ({
  grain,
  quantity,
  onQuantityChange,
  cardIndex = 0,
  isVisible = true,
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const isHiddenCard = cardIndex >= 9;

  // Update input value when quantity prop changes (from external updates like +/- buttons)
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

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
            <input
              type="number"
              className="grain-card-quantity-value"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value); // Allow any input temporarily

                // Only update the actual quantity if it's a valid number or empty
                if (value === "") {
                  onQuantityChange(grain.id, 0);
                } else {
                  const newQuantity = parseFloat(value);
                  if (!isNaN(newQuantity) && newQuantity >= 0) {
                    onQuantityChange(grain.id, newQuantity);
                  }
                }
              }}
              onBlur={(e) => {
                // On blur, ensure we have a valid display value
                const value = e.target.value;
                if (value === "" || isNaN(parseFloat(value))) {
                  setInputValue("0");
                  onQuantityChange(grain.id, 0);
                } else {
                  const newQuantity = parseFloat(value);
                  if (newQuantity >= 0) {
                    setInputValue(newQuantity.toString());
                    onQuantityChange(grain.id, newQuantity);
                  } else {
                    setInputValue("0");
                    onQuantityChange(grain.id, 0);
                  }
                }
              }}
              step="0.5"
              min="0"
            />
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
