import { useState, useEffect } from "react";
import { apiService } from "../services/api";

export const FreeItemOffers = ({ cartTotal, productsData }) => {
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllOffers = async () => {
      setLoading(true);
      try {
        // Fetch with a high amount to get all offers
        const offers = await apiService.fetchAdditionalItemCoupons(999999);

        // Correlate with product data
        const correlatedOffers = offers.map((offer) => {
          const product = productsData?.find((p) => p.id == offer.productId);
          return {
            ...offer,
            product: product || {
              id: offer.productId,
              name:
                offer.productName || offer.product?.name || "Unknown Product",
              price: offer.product?.price || 0,
            },
          };
        });

        setAllOffers(correlatedOffers);
      } catch (error) {
        console.error("Failed to fetch free item offers:", error);
        setAllOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (productsData && productsData.length > 0) {
      fetchAllOffers();
    }
  }, [productsData]);

  if (loading) {
    return (
      <div className="free-offers-container">
        <h4 className="free-offers-title">🎁 Free Item Offers</h4>
        <div className="free-offers-loading">Loading offers...</div>
      </div>
    );
  }

  if (!allOffers || allOffers.length === 0) {
    return null;
  }

  return (
    <div className="free-offers-container">
      <h4 className="free-offers-title">🎁 Free Item Offers</h4>
      <div className="free-offers-list">
        {allOffers.map((offer, index) => {
          const isEligible = cartTotal >= (offer.minOrderAmount || 0);
          const remainingAmount = Math.max(
            0,
            (offer.minOrderAmount || 0) - cartTotal
          );

          return (
            <div
              key={`offer-${offer.id || index}`}
              className={`free-offer-item ${
                isEligible ? "eligible" : "locked"
              }`}
            >
              <div className="free-offer-info">
                <div className="free-offer-product">
                  <span className="free-offer-name">
                    {offer.product?.name || offer.productName || offer.name}
                  </span>
                  <span className="free-offer-value">
                    Worth ₹
                    {(offer.product?.price || offer.price || 0).toFixed(0)}
                  </span>
                </div>
                <div className="free-offer-condition">
                  {isEligible ? (
                    <span className="eligible-text">
                      ✅ Eligible - Added to cart!
                    </span>
                  ) : (
                    <span className="locked-text">
                      Add ₹{remainingAmount.toFixed(0)} more to unlock
                    </span>
                  )}
                </div>
              </div>
              <div className="free-offer-threshold">
                <span className="threshold-amount">
                  ₹{(offer.minOrderAmount || 0).toFixed(0)}+
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
