import { useState } from "react";
import GrainSelector from "./components/GrainSelector";
import Visualization from "./components/Visualization";
import Cart from "./components/Cart";
import MixSummary from "./components/MixSummary"; // Import the new component
import Header from "./components/Header";
import "./components/Header.css";
import "./App.css";

function App() {
  const [grains, setGrains] = useState([
    { id: 1, name: "Wheat", color: "#F5DEB3", price: 40 },
    { id: 2, name: "Rye", color: "#D2B48C", price: 45 },
    { id: 3, name: "Barley", color: "#F0E68C", price: 50 },
    { id: 4, name: "Oats", color: "#F5F5DC", price: 35 },
    { id: 5, name: "Millet", color: "#E6D8AD", price: 55 },
  ]);

  const [mix, setMix] = useState([]);
  const [cart, setCart] = useState([]);

  const addToMix = (grain, weight) => {
    const existingGrain = mix.find((g) => g.id === grain.id);
    if (existingGrain) {
      setMix(
        mix.map((g) =>
          g.id === grain.id ? { ...g, weight: g.weight + weight } : g
        )
      );
    } else {
      setMix([...mix, { ...grain, weight }]);
    }
  };

  const removeFromMix = (grainId) => {
    setMix(mix.filter((g) => g.id !== grainId));
  };

  const addToCart = () => {
    setCart([...cart, mix]);
    console.log("Mix added to cart:", mix);
    setMix([]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content-area">
        <div className="main-container">
          <div className="content-left">
            <GrainSelector grains={grains} addToMix={addToMix} />
            <div className="visualization-and-mix">
              <Visualization mix={mix} />
              <MixSummary
                mix={mix}
                removeFromMix={removeFromMix}
                addToCart={addToCart}
              />
            </div>
          </div>
          <Cart
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
