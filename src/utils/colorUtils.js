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

export const getGrainColorClass = (grainName, prefix) => {
  const colorKey = grainColorMap[grainName] || "wheat-mp";
  return `${prefix}-${colorKey}`;
};
