import React from "react";
import { DeliveryDetails } from "./DeliveryDetails";
import "../styles/AddressForm.css";

export const AddressForm = ({
  isAddressView,
  addressDetails,
  onAddressChange,
  grandTotal,
}) => {
  return (
    <div className={`address-form-container ${isAddressView ? "visible" : ""}`}>
      <div className="address-form-header">
        <h3 style={{ marginLeft: "auto", marginRight: "auto" }}>
          Delivery Address
        </h3>
      </div>
      <div className="address-form-content">
        <DeliveryDetails
          addressDetails={addressDetails}
          onAddressChange={onAddressChange}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
};
