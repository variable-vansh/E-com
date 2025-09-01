import React from "react";

export const PaymentMethodSection = ({
  paymentMethod,
  onPaymentMethodChange,
}) => {
  const handleSelectChange = (e) => {
    onPaymentMethodChange(e);
  };

  return (
    <div className="form-group payment-method-section">
      <div className="payment-method-row">
        <label htmlFor="paymentMethod" className="payment-method-label">
          Payment Method
        </label>
        <div className="payment-dropdown-container">
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleSelectChange}
            className="payment-dropdown"
          >
            <option value="pay">Pay Online</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <div className="dropdown-arrow-icon">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
