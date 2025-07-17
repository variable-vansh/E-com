import React, { useState, useMemo, useCallback } from "react";
import "./App.css";

// Import data
import { grainsData, productsData } from "./data/shopData";

// Import components
import { Header } from "./components/Header";
import { AttaComposer } from "./components/AttaComposer";
import { GeneralStore } from "./components/GeneralStore";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";

export default function App() {
  const [customMix, setCustomMix] = useState({});
  const [cartMix, setCartMix] = useState({});
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleMixChange = useCallback((grainId, action) => {
    setCustomMix((prevMix) => {
      const newMix = { ...prevMix };
      const currentQty = newMix[grainId] || 0;
      if (action === "increase") {
        newMix[grainId] = parseFloat((currentQty + 0.5).toFixed(1));
      } else if (action === "decrease" && currentQty > 0) {
        newMix[grainId] = parseFloat((currentQty - 0.5).toFixed(1));
      }
      if (newMix[grainId] <= 0) {
        delete newMix[grainId];
      }
      return newMix;
    });
  }, []);

  const handleAddMixToCart = useCallback(() => {
    if (Object.keys(customMix).length > 0) {
      setCartMix(customMix);
      setCustomMix({});
    }
  }, [customMix]);

  const handleCartChange = useCallback((productId, action) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const currentQty = newCart[productId] || 0;
      if (action === "increase") {
        newCart[productId] = currentQty + 1;
      } else if (action === "decrease" && currentQty > 0) {
        newCart[productId] = currentQty - 1;
      }
      if (newCart[productId] <= 0) {
        delete newCart[productId];
      }
      return newCart;
    });
  }, []);

  const handleRemoveMixFromCart = useCallback(() => {
    setCartMix({});
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const cartItemCount = useMemo(() => {
    const mixCount = Object.keys(cartMix).length > 0 ? 1 : 0;
    const productCount = Object.keys(cart).length;
    return mixCount + productCount;
  }, [cart, cartMix]);

  return (
    <div className="app">
      <div className="bg-gradient"></div>
      <div className="app-layout">
        <div className="app-main-content">
          <Header cartItemCount={cartItemCount} onCartClick={toggleCart} />
          <main className="app-main">
            <AttaComposer
              customMix={customMix}
              onMixChange={handleMixChange}
              onAddToCart={handleAddMixToCart}
              grainsData={grainsData}
            />
            <GeneralStore
              products={productsData}
              cart={cart}
              onCartChange={handleCartChange}
            />
          </main>
          <Footer />
        </div>
        <Cart
          isOpen={isCartOpen}
          onClose={toggleCart}
          cart={cart}
          cartMix={cartMix}
          onCartChange={handleCartChange}
          onMixRemove={handleRemoveMixFromCart}
          grainsData={grainsData}
          productsData={productsData}
        />
      </div>
    </div>
  );
}
