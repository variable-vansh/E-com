import { useMemo } from "react";
import { GrainIcon } from "./Icons";

export const CartMixItem = ({ mix, onRemove, grainsData }) => {
  const { price, weight, grainList } = useMemo(() => {
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

    const grainList = mixItems.map((id) => {
      const grain = grainsData.find((g) => g.id == id);
      return {
        id: grain.id,
        name: grain.name,
        quantity: mix[id],
      };
    });

    return { price, weight, grainList };
  }, [mix, grainsData]);

  return (
    <div className="cart-item">
      <div className="product-img">
        <GrainIcon className="mix-icon" />
      </div>
      <div className="product-text">
        <div className="product-text-left">
          <h3>Multi grain mix</h3>
          <div className="product-info">
            <div className="grain-list">
              {grainList.map((grain) => (
                <div key={grain.id} className="grain-list-item">
                  {grain.name} - {grain.quantity} kg
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product-text-right">
          <span className="cart-item-price">₹{price.toFixed(2)}</span>
          <button className="remove-item-btn" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
