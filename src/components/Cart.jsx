import { useState } from "react";
import { CartMixItem } from "./CartMixItem";
import { CartProductItem } from "./CartProductItem";
import { BillDetails } from "./BillDetails";
import { StickyPayment } from "./StickyPayment";
import { useCartCalculations } from "./hooks/useCartCalculations";
import { AddressForm } from "./AddressForm";
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
  onOrderSuccess, // New prop to handle order success
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isAddressView, setIsAddressView] = useState(false);
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
      setIsAddressView(false); // Reset on close
    }, 400);
  };

  const handleProceedToAddress = () => {
    if (hasItems) {
      setIsAddressView(true);
    }
  };

  // Back to cart removed per new requirement; address view persists until cart closed

  if (!isOpen) return null;
  return (
    <>
      <div
        className={`cart-overlay ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      />
      <div
        className={`cart-container ${isClosing ? "closing" : ""} ${
          isAddressView ? "address-view" : ""
        }`}
      >
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <button className="cart-close-btn" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className={`cart-content ${isAddressView ? "expanded-view" : ""}`}>
          <div className="cart-items-column">
            {Object.keys(cartMix).length > 0 && (
              <CartMixItem
                mix={cartMix}
                onRemove={onMixRemove}
                grainsData={grainsData}
              />
            )}

            {Object.keys(cart).map((id) => {
              const product = productsData.find((p) => p.id == id);
              if (!product) return null; // Skip rendering if product not found
              return (
                <CartProductItem
                  key={id}
                  product={product}
                  quantity={cart[id]}
                  onQuantityChange={onCartChange}
                />
              );
            })}
            {Object.keys(cartMix).length === 0 &&
              Object.keys(cart).length === 0 && (
                <p className="cart-empty-message">Your cart is empty.</p>
              )}
          </div>

          {/* Bill Details Section */}
          {hasItems && (
            <div className="bill-details-column">
              <BillDetails
                itemTotalPrice={itemTotalPrice}
                deliveryFee={deliveryFee}
                discount={20}
                grandTotal={grandTotal}
              />
              {/* Contact moved back to separate Delivery panel; keep bill clean */}
            </div>
          )}
        </div>

        {/* Sticky Payment Section */}
        {!isAddressView && (
          <StickyPayment
            grandTotal={grandTotal}
            hasItems={hasItems}
            onPayClick={handleProceedToAddress}
          />
        )}
      </div>
      <AddressForm
        isAddressView={isAddressView}
        addressDetails={addressDetails}
        onAddressChange={handleAddressChange}
        grandTotal={grandTotal}
        cart={cart}
        cartMix={cartMix}
        grainsData={grainsData}
        productsData={productsData}
        onOrderSuccess={onOrderSuccess} // Pass the callback
      />
    </>
  );
};
