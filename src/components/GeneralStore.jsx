import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { SearchIcon } from "./Icons";

export const GeneralStore = ({ products, cart, onCartChange }) => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const searchMatch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [products, category, searchTerm]);

  const categories = ["All", "Oils & Ghee", "Spices", "Snacks", "Pulses"];

  return (
    <section className="general-store">
      <div className="general-store-header">
        <h2 className="general-store-title">Daily Essentials</h2>
        <div className="general-store-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="general-store-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`general-store-category-btn ${
              category === cat
                ? "general-store-category-btn-active"
                : "general-store-category-btn-inactive"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="general-store-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            onQuantityChange={onCartChange}
          />
        ))}
      </div>
    </section>
  );
};
