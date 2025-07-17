import { SeedlingIcon, LocationIcon, CartIcon } from "./Icons";

export const Header = ({ cartItemCount, onCartClick }) => (
  <header className="header">
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <SeedlingIcon />
          <h1>Shop Name</h1>
        </div>
        <div className="header-search">
          <LocationIcon />
          <input type="text" placeholder="Enter your delivery location" />
        </div>
        <button onClick={onCartClick} className="header-cart-btn">
          <CartIcon />
          <span>Cart</span>
          <span className="header-cart-count">{cartItemCount}</span>
        </button>
      </div>
    </div>
  </header>
);
