import React from "react";

const Shop = ({ addShopItemToCart }) => {
  const shopItems = [
    {
      id: 1,
      name: "Premium Grain Mix",
      description:
        "A carefully crafted blend of our finest grains, perfect for baking and cooking.",
      price: 299,
      emoji: "🌾",
    },
    {
      id: 2,
      name: "Organic Wheat Flour",
      description:
        "Stone-ground organic wheat flour, ideal for bread making and pastries.",
      price: 159,
      emoji: "🍞",
    },
    {
      id: 3,
      name: "Multi-Grain Cereal",
      description:
        "Nutritious breakfast cereal made from our signature grain blend.",
      price: 249,
      emoji: "🥣",
    },
    {
      id: 4,
      name: "Artisan Bread Kit",
      description:
        "Complete kit with pre-mixed grains and instructions for homemade bread.",
      price: 399,
      emoji: "🥖",
    },
    {
      id: 5,
      name: "Grain Storage Container",
      description:
        "Airtight container to keep your grains fresh for longer periods.",
      price: 199,
      emoji: "🏺",
    },
    {
      id: 6,
      name: "Recipe Book",
      description:
        "Collection of traditional and modern recipes using various grain combinations.",
      price: 99,
      emoji: "📖",
    },
  ];
  const handleAddToCart = (item) => {
    addShopItemToCart(item);
    // Optional: Add some visual feedback here
  };

  return (
    <div className="shop-section">
      <h2>Our Shop</h2>
      <div className="shop-grid">
        {shopItems.map((item) => (
          <div key={item.id} className="shop-item">
            <div className="shop-item-image">{item.emoji}</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="shop-item-price">₹{item.price}</div>
            <button
              className="shop-item-button"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
