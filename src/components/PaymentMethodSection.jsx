import React from "react";

export const PaymentMethodSection = ({
  paymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="form-group payment-method-section">
      <label className="payment-method-label">Payment Method</label>
      <div className="payment-options">
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={onPaymentMethodChange}
            className="payment-radio"
          />
          <label htmlFor="cod" className="payment-option-label">
            <div className="payment-option-content">
              <span className="payment-option-title">Cash on Delivery</span>
              <span className="payment-option-desc">
                Pay when order arrives
              </span>
            </div>
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="pay"
            name="paymentMethod"
            value="pay"
            checked={paymentMethod === "pay"}
            onChange={onPaymentMethodChange}
            className="payment-radio"
          />
          <label htmlFor="pay" className="payment-option-label">
            <div className="payment-option-content">
              <span className="payment-option-title">Pay Now</span>
              <span className="payment-option-desc">Secure online payment</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
