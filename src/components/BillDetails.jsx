export const BillDetails = ({
  itemTotalPrice,
  deliveryFee,
  staticDiscount = 0,
  couponDiscount = 0,
  freeItemsValue = 0,
  totalSavings = 0,
  grandTotal,
}) => {
  const hasAnyDiscount = staticDiscount > 0 || couponDiscount > 0;
  const hasFreeItems = freeItemsValue > 0;

  return (
    <div className="bill-details">
      <div className="bill-details-header">
        <h3>Bill Details</h3>
      </div>

      <div className="bill-row">
        <span>Item Total</span>
        <span>₹{itemTotalPrice.toFixed(2)}</span>
      </div>

      <div className="bill-row">
        <span>Delivery Charges</span>
        <span>₹{deliveryFee.toFixed(2)}</span>
      </div>

      {hasFreeItems && (
        <div className="bill-row savings">
          <span>Free Items Value</span>
          <span className="savings-amount">₹{freeItemsValue.toFixed(2)}</span>
        </div>
      )}

      {staticDiscount > 0 && (
        <div className="bill-row discount">
          <span>Discount</span>
          <span>-₹{staticDiscount.toFixed(2)}</span>
        </div>
      )}

      {couponDiscount > 0 && (
        <div className="bill-row coupon-discount">
          <span>Coupon Discount</span>
          <span>-₹{couponDiscount.toFixed(2)}</span>
        </div>
      )}

      {totalSavings > 0 && (
        <div className="bill-row total-savings">
          <span>Total Savings</span>
          <span className="savings-amount">₹{totalSavings.toFixed(2)}</span>
        </div>
      )}

      <div className="bill-row total-row">
        <span>Grand Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
