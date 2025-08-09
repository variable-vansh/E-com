// Data transformation utilities to convert API responses to frontend format

// Transform products from API format to frontend format
export const transformProducts = (apiProducts) => {
  return apiProducts
    .filter((product) => product.isActive)
    .map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      unit: product.description || "1kg", // You might want to add a unit field to your API
      image:
        product.image ||
        `https://placehold.co/200x200/ffd700/FFFFFF?text=${encodeURIComponent(
          product.name
        )}`,
      category: product.category?.name || "Other",
    }));
};

// Transform grains from API format to frontend format
export const transformGrains = (apiGrains) => {
  // Default colors and styling for grains - you can customize these
  const grainStyles = {
    Wheat: { color: "#fbbf24", cardColor: "bg-amber-100/60" },
    Jowar: { color: "#fed7aa", cardColor: "bg-orange-100/60" },
    Bajra: { color: "#a8a29e", cardColor: "bg-stone-200/60" },
    Ragi: { color: "#881337", cardColor: "bg-rose-200/60" },
    Chana: { color: "#fde047", cardColor: "bg-yellow-100/60" },
    Makka: { color: "#facc15", cardColor: "bg-yellow-200/60" },
    Soyabean: { color: "#bef264", cardColor: "bg-lime-100/60" },
    Oats: { color: "#cbd5e1", cardColor: "bg-slate-200/60" },
    Barley: { color: "#fcd34d", cardColor: "bg-amber-100/60" },
    Kuttu: { color: "#57534e", cardColor: "bg-stone-300/60" },
  };

  return apiGrains
    .filter((grain) => grain.isActive)
    .map((grain) => {
      const style = grainStyles[grain.name] || {
        color: "#6b7280",
        cardColor: "bg-gray-100/60",
      };

      return {
        id: grain.id,
        name: grain.name,
        price: parseFloat(grain.price),
        image:
          grain.image ||
          `https://placehold.co/100x100/c2b280/FFFFFF?text=${encodeURIComponent(
            grain.name
          )}`,
        nutrition: grain.nutrition || {
          Protein: "0g",
          Fiber: "0g",
          Carbs: "0g",
        },
        color: style.color,
        cardColor: style.cardColor,
      };
    });
};

// Transform categories from API format to frontend format
export const transformCategories = (apiCategories) => {
  return apiCategories.map((category) => ({
    id: category.id,
    name: category.name,
    parentId: category.parentId,
    products: category.products || [],
  }));
};

// Get unique categories from products for filtering
export const getUniqueCategories = (products) => {
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return ["All", ...categories.sort()];
};
