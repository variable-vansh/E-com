import { useState, useEffect, useCallback } from "react";
import { apiService } from "../services/api";

export const useCoupons = (cartTotal, userId = null, productsData = []) => {
  const [freeItems, setFreeItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);

  // Fetch additional item coupons when cart total changes
  useEffect(() => {
    const fetchFreeItems = async () => {
      if (cartTotal > 0) {
        try {
          const items = await apiService.fetchAdditionalItemCoupons(cartTotal);

          // Correlate free items with actual product data
          const correlatedItems = items.map((item) => {
            // Find the actual product from productsData
            const actualProduct = productsData.find(
              (p) => p.id == item.productId
            );

            // Determine eligibility: if backend doesn't set it, calculate it ourselves
            const isEligible =
              item.eligible !== undefined
                ? item.eligible
                : cartTotal >= (item.minOrderAmount || 0);

            const result = {
              ...item,
              eligible: isEligible, // Ensure eligible is set
              product: actualProduct || {
                id: item.productId,
                name:
                  item.productName || item.product?.name || "Unknown Product",
                price: item.product?.price || 0,
              },
            };

            return result;
          });

          setFreeItems(correlatedItems || []);
        } catch (error) {
          console.error("Failed to fetch free items:", error);
          setFreeItems([]);
        }
      } else {
        setFreeItems([]);
      }
    };

    fetchFreeItems();
  }, [cartTotal, productsData]);

  // Re-validate applied coupon when cart total changes
  useEffect(() => {
    const revalidateCoupon = async () => {
      if (appliedCoupon && cartTotal > 0) {
        try {
          const validation = await apiService.validateCoupon(
            appliedCoupon.code,
            cartTotal,
            userId
          );

          if (!validation.success || !validation.valid) {
            setAppliedCoupon(null);
            setCouponMessage(validation.message || "Coupon is no longer valid");
            setCouponError(true);
            setTimeout(() => {
              setCouponMessage("");
              setCouponError(false);
            }, 5000);
          } else if (
            validation.discountAmount !== appliedCoupon.discountAmount
          ) {
            // Update discount amount if it changed
            setAppliedCoupon({
              ...appliedCoupon,
              discountAmount: validation.discountAmount,
            });
          }
        } catch (error) {
          console.error("Failed to revalidate coupon:", error);
        }
      }
    };

    revalidateCoupon();
  }, [cartTotal, appliedCoupon, userId]);

  const applyCoupon = useCallback(
    async (code) => {
      if (!code.trim()) {
        setCouponMessage("Please enter a coupon code");
        setCouponError(true);
        setTimeout(() => {
          setCouponMessage("");
          setCouponError(false);
        }, 3000);
        return false;
      }

      setCouponLoading(true);
      setCouponMessage("");
      setCouponError(false);

      try {
        const validation = await apiService.validateCoupon(
          code,
          cartTotal,
          userId
        );

        if (validation.success && validation.valid) {
          setAppliedCoupon({
            ...validation.coupon,
            discountAmount: validation.discountAmount,
          });
          setCouponCode("");
          setCouponMessage(
            validation.message ||
              `Coupon applied! You saved ₹${validation.discountAmount}`
          );
          setCouponError(false);
          setTimeout(() => setCouponMessage(""), 5000);
          return true;
        } else {
          setCouponMessage(validation.message || "Invalid coupon code");
          setCouponError(true);
          setTimeout(() => {
            setCouponMessage("");
            setCouponError(false);
          }, 5000);
          return false;
        }
      } catch (error) {
        console.error("Coupon validation error:", error);
        setCouponMessage("Failed to validate coupon. Please try again.");
        setCouponError(true);
        setTimeout(() => {
          setCouponMessage("");
          setCouponError(false);
        }, 5000);
        return false;
      } finally {
        setCouponLoading(false);
      }
    },
    [cartTotal, userId]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponMessage("Coupon removed");
    setCouponError(false);
    setTimeout(() => setCouponMessage(""), 3000);
  }, []);

  const eligibleFreeItems = freeItems.filter((item) => item.eligible);
  const totalFreeItemsValue = eligibleFreeItems.reduce(
    (total, item) => total + (item.product?.price || 0),
    0
  );

  const couponDiscount = appliedCoupon?.discountAmount || 0;
  const totalSavings = totalFreeItemsValue + couponDiscount;

  return {
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
    totalSavings,
  };
};
