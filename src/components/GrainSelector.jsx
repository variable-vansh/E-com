import React, { useState } from "react";

const GrainSelector = ({ grains, addToMix }) => {
  const [weights, setWeights] = useState({});

  const handleWeightChange = (grainId, newWeight) => {
    setWeights({
      ...weights,
      [grainId]: Math.max(0, newWeight),
    });
  };

  const handleAdd = (grain) => {
    const weight = weights[grain.id] || 0;
    if (weight > 0) {
      addToMix(grain, weight);
      handleWeightChange(grain.id, 0);
    }
  };

  return (
    <div className="grain-selector">
      <h2>Grains</h2>
      <div className="grain-list">
        {grains.map((grain) => (
          <div key={grain.id} className="grain-card">
            <div
              className="grain-card-color"
              style={{ backgroundColor: grain.color }}
            ></div>
            <h3>{grain.name}</h3>
            <span className="grain-price">₹{grain.price}/kg</span>
            <div className="weight-control">
              <button
                onClick={() =>
                  handleWeightChange(grain.id, (weights[grain.id] || 0) - 0.5)
                }
              >
                -
              </button>
              <input
                type="number"
                min="0"
                step="0.5"
                value={weights[grain.id] || 0}
                onChange={(e) =>
                  handleWeightChange(grain.id, Number(e.target.value))
                }
              />
              <span>kg</span>
              <button
                onClick={() =>
                  handleWeightChange(grain.id, (weights[grain.id] || 0) + 0.5)
                }
              >
                +
              </button>
            </div>
            <button className="add-button" onClick={() => handleAdd(grain)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrainSelector;
