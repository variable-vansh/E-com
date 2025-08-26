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

        // Calculate dynamic font size based on available space
        const getFontSize = (percentage) => {
          if (percentage >= 20) return 1; // Normal size
          if (percentage >= 15) return 0.85; // Slightly smaller
          if (percentage >= 12) return 0.75; // Smaller
          if (percentage >= 8) return 0.65; // Much smaller
          if (percentage >= 5) return 0.55; // Very small
          return 0; // Hide text below 5%
        };

        const fontScale = getFontSize(percentage);
        const shouldShowText = fontScale > 0;

        return (
          <div
            key={id}
            className={`mix-visualizer-grain ${getGrainColorClass(
              grain.name,
              "mix-grain"
            )}`}
            style={{ height: `${percentage}%` }}
          >
            {shouldShowText && (
              <div
                className="mix-visualizer-grain-text"
                style={{ fontSize: `${fontScale}rem` }}
              >
                <div className="mix-visualizer-grain-name-weight">
                  <span className="mix-visualizer-grain-name">
                    {grain.name}
                  </span>{" "}
                  -
                  <span className="mix-visualizer-grain-weight">
                    {weight}kg
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
