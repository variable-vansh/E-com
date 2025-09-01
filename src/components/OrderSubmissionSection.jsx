import React from "react";

export const OrderSubmissionSection = ({
  highlightPayment,
  isSubmitting,
  grandTotal,
  paymentMethod,
  submitError,
  submitSuccess,
  onOrderSubmit,
}) => {
  return (
    <>
      {submitError && (
        <div
          className="error-message"
          style={{
            color: "#dc3545",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        >
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div
          className="success-message"
          style={{
            color: "#155724",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        >
          Order submitted successfully!
        </div>
      )}
      <div
        className={`delivery-payment-bar sticky-bottom ${
          highlightPayment ? "active" : ""
        }`}
      >
        <button
          type="button"
          disabled={!highlightPayment || isSubmitting}
          className="delivery-pay-btn"
          onClick={onOrderSubmit}
        >
          {isSubmitting
            ? "Processing..."
            : highlightPayment
            ? paymentMethod === "cod"
              ? `Confirm Order - ₹${grandTotal.toFixed(2)}`
              : `Pay Now - ₹${grandTotal.toFixed(2)}`
            : "Fill details to enable payment"}
        </button>
      </div>
    </>
  );
};
