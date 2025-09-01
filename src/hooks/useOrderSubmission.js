import { useState } from "react";
import { apiService } from "../services/api";
import { generateOrderId } from "../utils/orderUtils";

export const useOrderSubmission = ({
  cart,
  cartMix,
  grainsData,
  productsData,
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
        pricing: {
          itemTotal: grandTotal - 40, // Assuming delivery fee is 40
          deliveryFee: 40,
          discount: 20,
          grandTotal: grandTotal,
        },
        orderTimestamp: new Date().toISOString(),
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "cod_pending" : "pending",
        orderStatus: "confirmed",
      };

      console.log("Submitting order data:", orderData);

      const response = await apiService.submitOrder(orderData);

      console.log("Order submitted successfully:", response);
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
