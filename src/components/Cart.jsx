import { useState, useCallback } from "react";
import { CartMixItem } from "./CartMixItem";
import { CartProductItem } from "./CartProductItem";
import { BillDetails } from "./BillDetails";
import { StickyPayment } from "./StickyPayment";
import { CouponInput } from "./CouponInput";
import { FreeItemOffers } from "./FreeItemOffers";
import { useCartCalculations } from "./hooks/useCartCalculations";
import { useCoupons } from "../hooks/useCoupons";
import { AddressForm } from "./AddressForm";
import "../styles/Cart.css";
import "../styles/FreeItemOffers.css";

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

  // Calculate cart total for coupon system (includes delivery fee)
  const cartTotalForCoupons =
    Object.keys(cart).reduce((sum, id) => {
      const product = productsData?.find((p) => p.id == id);
      const price = product?.price || 25;
      return sum + cart[id] * price;
    }, 0) +
    Object.keys(cartMix).reduce((sum, id) => {
      const grain = grainsData?.find((g) => g.id == id);
      const price = grain?.price || 50;
      return sum + cartMix[id] * price;
    }, 0);

  const {
    itemTotalPrice,
    deliveryFee,
    staticDiscount,
    totalDiscount,
    totalSavings,
    grandTotal,
    isPayButtonDisabled,
    hasItems,
    isAddressFilled,
  } = useCartCalculations(
    cart,
    cartMix,
    addressDetails,
    grainsData,
    productsData,
    null, // Pass null initially for appliedCoupon
    0 // Pass 0 initially for totalFreeItemsValue
  );

  // Use coupon hook with cart total (not just item total)
  const {
    freeItems,
    eligibleFreeItems,
    appliedCoupon,
    couponCode,
    setCouponCode,
    couponLoading,
    couponMessage,
    couponError,
    applyCoupon,
    removeCoupon,
    totalFreeItemsValue,
    couponDiscount,
  } = useCoupons(cartTotalForCoupons, null, productsData);

  // Recalculate with coupon data
  const finalCalculations = useCartCalculations(
    cart,
    cartMix,
    addressDetails,
    grainsData,
    productsData,
    appliedCoupon,
    totalFreeItemsValue
  );

  const handleAddressChange = useCallback((e) => {
    const { id, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [id]: value }));
  }, []);

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

            {/* Free Items at the end of the cart */}
            {eligibleFreeItems &&
              eligibleFreeItems.length > 0 &&
              eligibleFreeItems.map((item, index) => {
                // Create a product-like object for CartProductItem
                const freeProduct = {
                  id: `free-${item.id || index}`,
                  name:
                    item.product?.name ||
                    item.productName ||
                    item.name ||
                    "Free Item",
                  price: 0, // Free items have price 0
                  originalPrice: item.product?.price || item.price || 0, // Store original price for display
                  unit: item.product?.unit || "1kg",
                  image: item.product?.image || "/default-product.jpg",
                  description:
                    item.description ||
                    item.product?.description ||
                    "Free with your order",
                  isFreeItem: true, // Flag to identify free items
                };

                return (
                  <div
                    key={`free-${item.id || index}`}
                    className="free-item-wrapper"
                  >
                    <CartProductItem
                      product={freeProduct}
                      quantity={1}
                      onQuantityChange={() => {}} // Free items can't be modified
                      isFreeItem={true}
                    />
                  </div>
                );
              })}

            {Object.keys(cartMix).length === 0 &&
              Object.keys(cart).length === 0 && (
                <p className="cart-empty-message">Your cart is empty.</p>
              )}
          </div>

          {/* Cart Partition */}
          <div className="cart-partition"></div>

          {/* Bill Details Section */}
          {hasItems && (
            <div className="bill-details-column">
              {/* Coupon Input */}
              <CouponInput
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                onApplyCoupon={applyCoupon}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={removeCoupon}
                loading={couponLoading}
                message={couponMessage}
                isError={couponError}
                itemTotalPrice={cartTotalForCoupons}
              />

              {/* Free Item Offers */}
              <FreeItemOffers
                cartTotal={cartTotalForCoupons}
                productsData={productsData}
              />

              {/* Bill Details */}
              <BillDetails
                itemTotalPrice={itemTotalPrice}
                deliveryFee={finalCalculations.deliveryFee}
                staticDiscount={finalCalculations.staticDiscount}
                couponDiscount={finalCalculations.couponDiscount}
                freeItemsValue={finalCalculations.freeItemsValue}
                totalSavings={finalCalculations.totalSavings}
                grandTotal={finalCalculations.grandTotal}
              />
              {/* Contact moved back to separate Delivery panel; keep bill clean */}
            </div>
          )}
        </div>

        {/* Sticky Payment Section */}
        {!isAddressView && (
          <StickyPayment
            grandTotal={finalCalculations.grandTotal}
            hasItems={hasItems}
            onPayClick={handleProceedToAddress}
          />
        )}
      </div>
      <AddressForm
        isAddressView={isAddressView}
        addressDetails={addressDetails}
        onAddressChange={handleAddressChange}
        grandTotal={finalCalculations.grandTotal}
        cart={cart}
        cartMix={cartMix}
        grainsData={grainsData}
        productsData={productsData}
        appliedCoupon={appliedCoupon}
        eligibleFreeItems={eligibleFreeItems}
        onOrderSuccess={onOrderSuccess} // Pass the callback
      />
    </>
  );
};
