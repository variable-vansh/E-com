import React from "react";

const MixSummary = ({ mix, removeFromMix, addToCart }) => {
  return (
    <div className="mix-summary">
      <h3>Current Mix</h3>
      {mix.length === 0 ? (
        <p>Your mix is empty. Add some grains!</p>
      ) : (
        <>
          <ul>
            {mix.map((grain) => (
              <li key={grain.id}>
                <span>
                  {grain.name}: {grain.weight} kg
                </span>
                <button onClick={() => removeFromMix(grain.id)}>🗑️</button>
              </li>
            ))}
          </ul>
          <button className="add-button" onClick={addToCart}>
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default MixSummary;
