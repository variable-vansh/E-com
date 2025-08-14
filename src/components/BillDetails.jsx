export const BillDetails = ({
  itemTotalPrice,
  deliveryFee,
  discount = 0,
  grandTotal,
}) => {
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

      {discount > 0 && (
        <div className="bill-row discount">
          <span>Discount</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
      )}

      <div className="bill-row total-row">
        <span>Grand Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};
