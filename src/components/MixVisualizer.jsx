import { useMemo } from "react";
import { getGrainColorClass } from "../utils/colorUtils";
import "../styles/MixVisualizer.css";

export const MixVisualizer = ({ mix, grains }) => {
  const { totalWeight, mixItems } = useMemo(() => {
    const mixItems = Object.keys(mix).filter((id) => mix[id] > 0);
    const totalWeight = mixItems.reduce((sum, id) => sum + mix[id], 0);
    return { totalWeight, mixItems };
  }, [mix]);

  if (mixItems.length === 0) {
    return (
      <div className="mix-visualizer-empty">Select grains to see your mix</div>
    );
  }

  return (
    <div className="mix-visualizer">
      {mixItems.map((id) => {
        const grain = grains.find((g) => g.id == id);
        const percentage = (mix[id] / totalWeight) * 100;
        const weight = mix[id];
        return (
          <div
            key={id}
            className={`mix-visualizer-grain ${getGrainColorClass(
              grain.name,
              "mix-grain"
            )}`}
            style={{ height: `${percentage}%` }}
          >
            {percentage > 8 && (
              <div className="mix-visualizer-grain-text">
                <div className="mix-visualizer-grain-name-weight">
                  <span className="mix-visualizer-grain-name">
                    {grain.name}
                  </span>{" "}
                  -
                  <span className="mix-visualizer-grain-weight">
                    {weight}kg
                  </span>
                </div>
                <div className="mix-visualizer-grain-percentage">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
