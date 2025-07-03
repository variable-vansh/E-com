import React from "react";

const Visualization = ({ mix }) => {
  const totalWeight = mix.reduce((sum, grain) => sum + grain.weight, 0);

  return (
    <div className="visualization-container">
      {mix.length === 0 ? (
        <p>Add grains to create mix.</p>
      ) : (
        <div className="visualization-bar">
          {mix.map((grain) => (
            <div
              key={grain.id}
              className="visualization-segment"
              style={{
                height: `${(grain.weight / totalWeight) * 100}%`,
                backgroundColor: grain.color,
              }}
            >
              {grain.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Visualization;
