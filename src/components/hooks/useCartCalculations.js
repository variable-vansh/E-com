import { useMemo } from "react";

export const useCartCalculations = (
  cart,
  cartMix,
  addressDetails,
  grainsData,
  productsData
) => {
  return useMemo(() => {
    // Return default values if data isn't loaded yet
    if (!grainsData?.length || !productsData?.length) {
      return {
        itemTotalPrice: 0,
        deliveryFee: 0,
        grandTotal: 0,
        isPayButtonDisabled: true,
        hasItems: false,
        isAddressFilled: false,
      };
    }

    let total = 0;

    // Calculate mix price
    const mixInCart = Object.keys(cartMix).length > 0;
    if (mixInCart) {
      total += Object.keys(cartMix).reduce((sum, id) => {
        const grain = grainsData.find((g) => g.id == id);
        if (!grain) return sum; // Skip if grain not found
        return sum + cartMix[id] * grain.price;
      }, 0);
    }

    // Calculate products price
    total += Object.keys(cart).reduce((sum, id) => {
      const product = productsData.find((p) => p.id == id);
      if (!product) return sum; // Skip if product not found
      return sum + cart[id] * product.price;
    }, 0);

    const deliveryFee = total > 0 ? 20 : 0;
    const discount = 20;
    const grandTotal = total + deliveryFee - discount;
    // Check if address is filled
    const { address, pincode, phone } = addressDetails;
    const isAddressFilled =
      address.trim() !== "" && pincode.trim() !== "" && phone.trim() !== "";
    const hasItems = mixInCart || Object.keys(cart).length > 0;

    return {
      itemTotalPrice: total,
      deliveryFee,
      grandTotal,
      isPayButtonDisabled: !isAddressFilled || !hasItems,
      hasItems,
      isAddressFilled,
    };
  }, [cart, cartMix, addressDetails, grainsData, productsData]);
};
