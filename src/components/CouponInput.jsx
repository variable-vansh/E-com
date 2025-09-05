import { useState } from "react";
import { CouponList } from "./CouponList";
import { useAvailableCoupons } from "../hooks/useAvailableCoupons";
import "../styles/CouponInput.css";

export const CouponInput = ({
  couponCode,
  setCouponCode,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
  loading,
  message,
  isError,
  itemTotalPrice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCouponList, setShowCouponList] = useState(false);

  const { allCoupons, loading: couponsLoading } =
    useAvailableCoupons(itemTotalPrice);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyCoupon(couponCode);
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(true);
    setShowCouponList(true);
  };

  const handleSelectCoupon = (code) => {
    setCouponCode(code);
    setShowCouponList(false);
    onApplyCoupon(code);
  };

  const handleCloseCouponList = () => {
    setShowCouponList(false);
    setIsExpanded(false);
  };

  if (appliedCoupon) {
    return (
      <div className="coupon-applied">
        <div className="coupon-applied-content">
          <div className="coupon-applied-info">
            <span className="coupon-applied-icon">🎉</span>
            <div className="coupon-applied-text">
              <span className="coupon-applied-name">{appliedCoupon.name}</span>
              <span className="coupon-applied-discount">
                You saved ₹{appliedCoupon.discountAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="coupon-remove-btn"
            title="Remove coupon"
          >
            ×
          </button>
        </div>
        {message && !isError && (
          <div className="coupon-message success">{message}</div>
        )}
      </div>
    );
  }

  return (
    <div className="coupon-input-container">
      {!isExpanded ? (
        <button
          type="button"
          onClick={handleToggleExpand}
          className="coupon-toggle-btn"
        >
          <span className="coupon-icon">🏷️</span>
          Apply Coupon Code
        </button>
      ) : (
        <>
          {showCouponList ? (
            <CouponList
              coupons={allCoupons}
              loading={couponsLoading}
              onSelectCoupon={handleSelectCoupon}
              onClose={handleCloseCouponList}
              itemTotalPrice={itemTotalPrice}
            />
          ) : (
            <form onSubmit={handleSubmit} className="coupon-input-form">
              <div className="coupon-input-wrapper">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="coupon-input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !couponCode.trim()}
                  className="coupon-apply-btn"
                >
                  {loading ? "Applying..." : "Apply"}
                </button>
              </div>
              <div className="coupon-form-actions">
                <button
                  type="button"
                  onClick={() => setShowCouponList(true)}
                  className="coupon-browse-btn"
                >
                  Browse Available Coupons
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setCouponCode("");
                  }}
                  className="coupon-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {message && (
        <div className={`coupon-message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};
