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
      </div>{" "}
      <div className="cart-item-details">
        <div className="mix-visualizer">
          <div
            className="mini-visualizer"
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{ cursor: "pointer" }}
            title="Click to show/hide breakdown"
          >
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
          <span className="mix-weight">{weight.toFixed(1)} kg total</span>
        </div>
        <button className="remove-button" onClick={onRemove}>
          ×
        </button>
      </div>
      {showBreakdown && (
        <div className="mix-breakdown">
          {visualizerBars.map((bar) => (
            <div key={bar.id} className="mix-item">
              <div className="mix-item-info">
                <div
                  className="mix-color-indicator"
                  style={{ backgroundColor: bar.color }}
                />
                <span>{bar.name}</span>
              </div>
              <span>{bar.quantity}kg</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
