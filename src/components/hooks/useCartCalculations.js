import { useMemo } from "react";

export const useCartCalculations = (
  cart,
  cartMix,
  addressDetails,
  grainsData,
  productsData,
  appliedCoupon = null,
  freeItemsValue = 0
) => {
  return useMemo(() => {
    // Check if we have items regardless of data loading state
    const mixInCart = Object.keys(cartMix).length > 0;
    const hasItems = mixInCart || Object.keys(cart).length > 0;

    // Calculate totals even when data isn't fully loaded
    let total = 0;
    const deliveryFee = 20;
    const staticDiscount = 20; // Your existing static discount

    // Calculate mix price (use fallback price if grain data not available)
    if (mixInCart) {
      total += Object.keys(cartMix).reduce((sum, id) => {
        const grain = grainsData?.find((g) => g.id == id);
        const price = grain?.price || 50; // Fallback price per kg if grain not found
        return sum + cartMix[id] * price;
      }, 0);
    }

    // Calculate products price (use fallback price if product data not available)
    total += Object.keys(cart).reduce((sum, id) => {
      const product = productsData?.find((p) => p.id == id);
      const price = product?.price || 25; // Fallback price per item if product not found
      return sum + cart[id] * price;
    }, 0);

    // Calculate coupon discount
    const couponDiscount = appliedCoupon?.discountAmount || 0;

    // Calculate total discount (static + coupon)
    const totalDiscount = staticDiscount + couponDiscount;

    // Calculate grand total
    const grandTotal = Math.max(0, total + deliveryFee - totalDiscount);

    // Calculate total savings (including free items value)
    const totalSavings = totalDiscount + freeItemsValue;

    // Check if address is filled
    const { address, pincode, phone } = addressDetails;
    const isAddressFilled =
      address.trim() !== "" && pincode.trim() !== "" && phone.trim() !== "";

    // Data is not fully loaded but we can still show estimates
    const dataNotLoaded = !grainsData?.length || !productsData?.length;

    return {
      itemTotalPrice: total,
      deliveryFee,
      staticDiscount,
      couponDiscount,
      totalDiscount,
      freeItemsValue,
      totalSavings,
      grandTotal,
      isPayButtonDisabled: dataNotLoaded || !isAddressFilled || !hasItems,
      hasItems,
      isAddressFilled,
    };
  }, [
    cart,
    cartMix,
    addressDetails.address,
    addressDetails.pincode,
    addressDetails.phone,
    grainsData,
    productsData,
    appliedCoupon,
    freeItemsValue,
  ]);
};
