import { useState } from "react";
import { CartMixItem } from "./CartMixItem";
import { CartProductItem } from "./CartProductItem";
import { DeliveryDetails } from "./DeliveryDetails";
import { CartSummary } from "./CartSummary";
import { useCartCalculations } from "./hooks/useCartCalculations";
import "../styles/Cart.css";

export const Cart = ({
  isOpen,
  onClose,
  cart,
  cartMix,
  onCartChange,
  onMixRemove,
  grainsData,
  productsData,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    address: "",
    pincode: "",
    phone: "",
  });
  const {
    itemTotalPrice,
    deliveryFee,
    grandTotal,
    isPayButtonDisabled,
    hasItems,
    isAddressFilled,
  } = useCartCalculations(
    cart,
    cartMix,
    addressDetails,
    grainsData,
    productsData
  );
  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400);
  };

  if (!isOpen) return null;
  return (
    <>
      <div
        className={`cart-overlay ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      />
      <div className={`cart-container ${isClosing ? "closing" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <button className="cart-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="cart-content">
          {Object.keys(cartMix).length > 0 && (
            <CartMixItem
              mix={cartMix}
              onRemove={onMixRemove}
              grainsData={grainsData}
            />
          )}
          {Object.keys(cart).map((id) => (
            <CartProductItem
              key={id}
              product={productsData.find((p) => p.id == id)}
              quantity={cart[id]}
              onQuantityChange={onCartChange}
            />
          ))}
          {Object.keys(cartMix).length === 0 &&
            Object.keys(cart).length === 0 && (
              <p className="cart-empty-message">Your cart is empty.</p>
            )}
        </div>{" "}
        <div className="cart-footer">
          <DeliveryDetails
            addressDetails={addressDetails}
            onAddressChange={handleAddressChange}
          />{" "}
          <CartSummary
            itemTotalPrice={itemTotalPrice}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            isPayButtonDisabled={isPayButtonDisabled}
            hasItems={hasItems}
            isAddressFilled={isAddressFilled}
          />
        </div>
      </div>
    </>
  );
};
