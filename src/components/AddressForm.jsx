import React from "react";
import { DeliveryDetails } from "./DeliveryDetails";
import "../styles/AddressForm.css";

export const AddressForm = ({
  isAddressView,
  addressDetails,
  onAddressChange,
  onBack,
}) => {
  return (
    <div className={`address-form-container ${isAddressView ? "visible" : ""}`}>
      <div className="address-form-header">
        <button onClick={onBack} className="back-button">
          &larr; Back to Cart
        </button>
        <h3>Delivery Address</h3>
      </div>
      <div className="address-form-content">
        <DeliveryDetails
          addressDetails={addressDetails}
          onAddressChange={onAddressChange}
        />
      </div>
    </div>
  );
};
