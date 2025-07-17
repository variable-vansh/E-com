import { useMemo, useState } from "react";

export const CartMixItem = ({ mix, onRemove, grainsData }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { price, weight, visualizerBars } = useMemo(() => {
    let price = 0,
      weight = 0;
    const mixItems = Object.keys(mix).filter((id) => mix[id] > 0);

    mixItems.forEach((id) => {
      const grain = grainsData.find((g) => g.id == id);
      if (grain) {
        price += mix[id] * grain.price;
        weight += mix[id];
      }
    });

    const visualizerBars = mixItems.map((id) => {
      const grain = grainsData.find((g) => g.id == id);
      const percentage = (mix[id] / weight) * 100;
      return {
        id: grain.id,
        color: grain.color,
        width: `${percentage}%`,
        name: grain.name,
        quantity: mix[id],
      };
    });

    return { price, weight, visualizerBars };
  }, [mix, grainsData]);

  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <h3>Custom Multigrain Atta</h3>
        <span className="cart-item-price">₹{price.toFixed(2)}</span>
      </div>

      <div className="cart-item-details">
        <div className="mix-visualizer">
          <div
            className="mini-visualizer-container"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            <div className="mini-visualizer">
              {visualizerBars.map((bar) => (
                <div
                  key={bar.id}
                  className="visualizer-segment"
                  style={{
                    width: bar.width,
                    backgroundColor: bar.color,
                  }}
                />
              ))}
            </div>
            <div className="mix-info">
              <span className="mix-weight">{weight.toFixed(1)} kg total</span>
              <span className="mix-grains-count">
                {visualizerBars.length} grain
                {visualizerBars.length > 1 ? "s" : ""}
              </span>
            </div>
            <div
              className={`dropdown-arrow ${showBreakdown ? "expanded" : ""}`}
            >
              ▼
            </div>
          </div>
        </div>
        <button className="remove-button" onClick={onRemove}>
          ×
        </button>
      </div>

      <div className={`mix-breakdown ${showBreakdown ? "expanded" : ""}`}>
        <div className="mix-breakdown-content">
          <div className="mix-breakdown-header">
            <h4>Mix Composition</h4>
            <span className="total-weight">Total: {weight.toFixed(1)} kg</span>
          </div>
          <div className="mix-items-grid">
            {visualizerBars.map((bar, index) => (
              <div
                key={bar.id}
                className="mix-item"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="mix-item-info">
                  <div
                    className="mix-color-indicator"
                    style={{ backgroundColor: bar.color }}
                  />
                  <span className="mix-item-name">{bar.name}</span>
                </div>
                <div className="mix-item-details">
                  <span className="mix-item-quantity">{bar.quantity}kg</span>
                  <span className="mix-item-percentage">
                    {((bar.quantity / weight) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
