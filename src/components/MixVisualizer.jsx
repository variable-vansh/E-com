import { useMemo } from "react";

export const MixVisualizer = ({ mix, grains }) => {
  const { totalWeight, mixItems } = useMemo(() => {
    const mixItems = Object.keys(mix).filter((id) => mix[id] > 0);
    const totalWeight = mixItems.reduce((sum, id) => sum + mix[id], 0);
    return { totalWeight, mixItems };
  }, [mix]);

  const getGrainColorClass = (grainName) => {
    const colorMap = {
      Wheat: "mix-grain-wheat",
      Jowar: "mix-grain-jowar",
      Bajra: "mix-grain-bajra",
      Ragi: "mix-grain-ragi",
      Chana: "mix-grain-chana",
      Makka: "mix-grain-makka",
      Soyabean: "mix-grain-soyabean",
      Oats: "mix-grain-oats",
      "Barley (Jau)": "mix-grain-barley",
      Kuttu: "mix-grain-kuttu",
    };
    return colorMap[grainName] || "mix-grain-wheat";
  };

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
        return (
          <div
            key={id}
            className={`mix-visualizer-grain ${getGrainColorClass(grain.name)}`}
            style={{ height: `${percentage}%` }}
          >
            {percentage > 10 && `${grain.name} ${percentage.toFixed(0)}%`}
          </div>
        );
      })}
    </div>
  );
};
