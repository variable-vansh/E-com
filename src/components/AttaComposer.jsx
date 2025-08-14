import { useState, useMemo } from "react";
import { GrainCard } from "./GrainCard";
import { MixVisualizer } from "./MixVisualizer";
import { ChevronDownIcon } from "./Icons";
import "../styles/AttaComposer.css";

export const AttaComposer = ({
  customMix,
  onMixChange,
  onAddToCart,
  grainsData,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { totalWeight, totalPrice, canAddToCart } = useMemo(() => {
    const mixItems = Object.keys(customMix).filter((id) => customMix[id] > 0);
    const totalWeight = mixItems.reduce((sum, id) => sum + customMix[id], 0);
    const totalPrice = mixItems.reduce((sum, id) => {
      const grain = grainsData.find((g) => g.id == id);
      return sum + customMix[id] * grain.price;
    }, 0);
    return { totalWeight, totalPrice, canAddToCart: mixItems.length > 0 };
  }, [customMix, grainsData]);
  const grainsToShow = isExpanded ? grainsData : grainsData.slice(0, 6);
  return (
    <section className="atta-composer">
      <div className="atta-composer-container">
        <h2 className="atta-composer-title">Create Your Own Multigrain Atta</h2>
        <p className="atta-composer-subtitle">
          Select grains and their weight (in KGs) to create your perfect,
          healthy mix.
        </p>
        <div className="atta-composer-content">
          <div className="atta-composer-left">
            <div
              className={`atta-composer-grid ${isExpanded ? "expanded" : ""}`}
            >
              {grainsToShow.map((grain, index) => (
                <GrainCard
                  key={grain.id}
                  grain={grain}
                  quantity={customMix[grain.id] || 0}
                  onQuantityChange={onMixChange}
                  cardIndex={index}
                  isVisible={index < 6 || isExpanded}
                />
              ))}
            </div>
            {grainsData.length > 6 && (
              <div className="atta-composer-show-more">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="atta-composer-show-more-btn"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  <ChevronDownIcon className={isExpanded ? "rotate-180" : ""} />
                </button>
              </div>
            )}
          </div>
          <div className="atta-composer-right">
            <div className="atta-composer-sticky">
              <h3 className="atta-composer-mix-title">Your Custom Mix</h3>
              <div className="atta-composer-visualizer">
                <MixVisualizer mix={customMix} grains={grainsData} />
              </div>
              <div className="atta-composer-summary">
                <div className="atta-composer-summary-border">
                  <div className="atta-composer-summary-row">
                    <span className="atta-composer-summary-label">
                      Total Weight:
                    </span>
                    <span className="atta-composer-summary-weight">
                      {totalWeight.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="atta-composer-summary-row">
                    <span className="atta-composer-summary-label">
                      Total Price:
                    </span>
                    <span className="atta-composer-summary-price">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={onAddToCart}
                    disabled={!canAddToCart}
                    className="atta-composer-add-btn"
                  >
                    Add Mix to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
