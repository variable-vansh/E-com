import "../styles/CouponList.css";

export const CouponList = ({
  coupons,
  loading,
  onSelectCoupon,
  onClose,
  itemTotalPrice,
}) => {
  const handleCouponClick = (coupon) => {
    if (coupon.eligible) {
      onSelectCoupon(coupon.code);
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="coupon-list-container">
        <div className="coupon-list-header">
          <h4>Available Coupons</h4>
          <button onClick={onClose} className="coupon-list-close">
            ×
          </button>
        </div>
        <div className="coupon-list-loading">Loading coupons...</div>
      </div>
    );
  }

  return (
    <div className="coupon-list-container">
      <div className="coupon-list-header">
        <h4>Available Coupons</h4>
        <button onClick={onClose} className="coupon-list-close">
          ×
        </button>
      </div>

      <div className="coupon-list">
        {coupons.length === 0 ? (
          <div className="no-coupons">No coupons available at the moment</div>
        ) : (
          coupons.map((coupon) => {
            const requiredAmount =
              coupon.minOrderAmountForDiscount || coupon.minOrderAmount || 0;
            const shortfall = Math.max(0, requiredAmount - itemTotalPrice);

            return (
              <div
                key={coupon.id}
                className={`coupon-list-item ${
                  coupon.eligible ? "eligible" : "locked"
                }`}
                onClick={() => handleCouponClick(coupon)}
              >
                <div className="coupon-info">
                  <div className="coupon-header">
                    <span className="coupon-code">{coupon.code}</span>
                    <span className="coupon-discount">
                      ₹{coupon.discountAmount} OFF
                    </span>
                  </div>
                  <div className="coupon-name">{coupon.name}</div>
                  <div className="coupon-condition">
                    {coupon.eligible ? (
                      <span className="eligible-text">✅ Ready to use</span>
                    ) : (
                      <span className="locked-text">
                        🔒 Add ₹{shortfall.toFixed(2)} more to unlock
                      </span>
                    )}
                  </div>
                </div>

                {coupon.eligible && (
                  <div className="coupon-apply-btn">Apply</div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
