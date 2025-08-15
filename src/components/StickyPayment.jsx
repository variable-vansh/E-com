export const StickyPayment = ({ grandTotal, hasItems = false, onPayClick }) => {
  const getButtonText = () => {
    if (!hasItems) return "Cart is Empty";
    return "Add Address and Pay";
  };

  return (
    <div className="sticky-payment">
      <button
        className={`pay-button ${!hasItems ? "disabled" : ""}`}
        disabled={!hasItems}
        onClick={onPayClick}
      >
        <span className="pay-button-total">₹{grandTotal.toFixed(2)}</span>
        <span className="pay-button-text">{getButtonText()}</span>
      </button>
    </div>
  );
};
