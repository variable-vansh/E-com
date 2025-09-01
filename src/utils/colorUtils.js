// src/utils/colorUtils.js

const grainColorMap = {
  Jo: "jo",
  Jowar: "jowar",
  "Kala Chana": "kala-chana",
  Makka: "makka",
  Ragi: "ragi",
  Soyabean: "soyabean",
  "Wheat (MP)": "wheat-mp",
  "Wheat (Punjab)": "wheat-punjab",
  "Barley (Jau)": "jo",
  Bajra: "bajra",
  Oats: "oats",
  Kuttu: "kuttu",
  Chana: "chana",
  Wheat: "wheat-mp", // Default wheat
};

const grainColors = {
  jo: "rgb(202, 138, 4)",
  jowar: "rgb(190, 140, 108)",
  "kala-chana": "rgb(92, 64, 51)",
  makka: "rgb(245, 158, 11)",
  ragi: "rgb(179, 72, 72)",
  soyabean: "rgb(250, 204, 21)",
  "wheat-mp": "rgb(252, 211, 77)",
  "wheat-punjab": "rgb(251, 191, 36)",
  bajra: "rgb(168, 162, 158)",
  oats: "rgb(148, 163, 184)",
  kuttu: "rgb(120, 113, 108)",
  chana: "rgb(254, 240, 138)",
};

export const getGrainColorClass = (grainName, prefix) => {
  const colorKey = grainColorMap[grainName] || "wheat-mp";
  return `${prefix}-${colorKey}`;
};

export const getGrainColor = (grainName) => {
  const colorKey = grainColorMap[grainName] || "wheat-mp";
  return grainColors[colorKey] || grainColors["wheat-mp"];
};
