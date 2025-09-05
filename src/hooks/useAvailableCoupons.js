import { useState, useEffect } from "react";
import { apiService } from "../services/api";

export const useAvailableCoupons = (itemTotalPrice) => {
  const [allCoupons, setAllCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllCoupons = async () => {
      if (!itemTotalPrice) return;

      setLoading(true);
      try {
        // Fetch discount code coupons
        const discountCoupons = await apiService.getAllCoupons("discount_code");

        // Process coupons to add eligibility status
        const processedCoupons = discountCoupons.map((coupon) => ({
          ...coupon,
          eligible:
            itemTotalPrice >=
            (coupon.minOrderAmountForDiscount || coupon.minOrderAmount || 0),
          type: "discount_code",
        }));

        setAllCoupons(processedCoupons);
      } catch (error) {
        console.error("Failed to fetch available coupons:", error);
        setAllCoupons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCoupons();
  }, [itemTotalPrice]);

  return {
    allCoupons,
    loading,
  };
};
