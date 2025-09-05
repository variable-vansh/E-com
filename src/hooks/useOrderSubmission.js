import { useState } from "react";
import { apiService } from "../services/api";
import { generateOrderId } from "../utils/orderUtils";

export const useOrderSubmission = ({
  cart,
  cartMix,
  grainsData,
  productsData,
  appliedCoupon = null,
  eligibleFreeItems = [],
  onOrderSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitOrder = async (manualFields, paymentMethod, grandTotal) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate a 6-digit order ID
      const orderId = generateOrderId();

      // Calculate item total without delivery and discounts
      const itemTotal =
        Object.keys(cart).reduce((sum, productId) => {
          const product = productsData.find((p) => p.id == productId);
          return sum + (product?.price || 0) * cart[productId];
        }, 0) +
        Object.keys(cartMix).reduce((sum, grainId) => {
          const grain = grainsData.find((g) => g.id == grainId);
          return sum + (grain?.price || 0) * cartMix[grainId];
        }, 0);

      // Calculate discounts
      const deliveryFee = 20;
      const staticDiscount = 20;
      const couponDiscount = appliedCoupon?.discountAmount || 0;
      const freeItemsValue = eligibleFreeItems.reduce(
        (sum, item) => sum + (item.product?.price || 0),
        0
      );

      // Prepare order data
      const orderData = {
        orderId: orderId,
        customerInfo: {
          fullName: manualFields.fullName,
          phone: manualFields.phone,
          address: {
            houseNumber: manualFields.houseNumber,
            street: manualFields.street,
            pincode: manualFields.pincode,
            fullAddress: [
              manualFields.houseNumber,
              manualFields.street,
              manualFields.pincode,
            ]
              .filter(Boolean)
              .join(", "),
          },
        },
        cartItems: Object.keys(cart).map((productId) => {
          const product = productsData.find((p) => p.id == productId);
          return {
            productId: parseInt(productId),
            productName: product?.name || "Unknown Product",
            quantity: cart[productId],
            price: product?.price || 0,
            totalPrice: (product?.price || 0) * cart[productId],
          };
        }),
        cartMix:
          Object.keys(cartMix).length > 0
            ? {
                grains: Object.keys(cartMix).map((grainId) => {
                  const grain = grainsData.find((g) => g.id == grainId);
                  return {
                    grainId: parseInt(grainId),
                    grainName: grain?.name || "Unknown Grain",
                    quantity: cartMix[grainId],
                    price: grain?.price || 0,
                    totalPrice: (grain?.price || 0) * cartMix[grainId],
                  };
                }),
              }
            : null,
        freeItems: eligibleFreeItems.map((item) => ({
          itemId: item.id,
          itemName: item.product?.name || "Unknown Item",
          itemType: "additional_item_coupon",
          originalPrice: item.product?.price || 0,
          description: item.description,
          minOrderAmount: item.minOrderAmount,
        })),
        appliedCoupon: appliedCoupon
          ? {
              id: appliedCoupon.id,
              name: appliedCoupon.name,
              code: appliedCoupon.code,
              type: appliedCoupon.type,
              discountAmount: appliedCoupon.discountAmount,
              minOrderAmountForDiscount:
                appliedCoupon.minOrderAmountForDiscount,
            }
          : null,
        pricing: {
          itemTotal: itemTotal,
          deliveryFee: deliveryFee,
          staticDiscount: staticDiscount,
          couponDiscount: couponDiscount,
          freeItemsValue: freeItemsValue,
          totalSavings: staticDiscount + couponDiscount + freeItemsValue,
          grandTotal: grandTotal,
        },
        orderTimestamp: new Date().toISOString(),
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "cod_pending" : "pending",
        orderStatus: "confirmed",
      };

      const response = await apiService.submitOrder(orderData);

      setSubmitSuccess(true);

      // Call the success callback with the order data
      if (onOrderSuccess) {
        onOrderSuccess(response);
      }

      // Clear form and redirect after brief delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitOrder,
  };
};
