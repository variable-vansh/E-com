export const CartSummary = ({
  itemTotalPrice,
  deliveryFee,
  grandTotal,
  isPayButtonDisabled,
  hasItems = false,
  isAddressFilled = false,
}) => {
  const getButtonText = () => {
    if (!hasItems) return "Cart is Empty";
    if (!isAddressFilled) return "Fill Address";
    return "Proceed to Pay";
  };

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span>Item Total</span>
        <span>₹{itemTotalPrice.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee.toFixed(2)}</span>
      </div>
      <div className="summary-row total-row">
        <span>To Pay</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
      <button
        className={`pay-button ${isPayButtonDisabled ? "disabled" : ""}`}
        disabled={isPayButtonDisabled}
      >
        {getButtonText()}
      </button>
    </div>
  );
};
