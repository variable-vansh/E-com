import React from "react";

export const DeliveryFormFields = ({
  manualFields,
  onFieldChange,
  onPincodeChange,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter full name"
          value={manualFields.fullName}
          onChange={onFieldChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="houseNumber">House / Flat No.</label>
        <input
          id="houseNumber"
          value={manualFields.houseNumber}
          onChange={onFieldChange}
          placeholder="E.g. 123A"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          id="street"
          value={manualFields.street}
          onChange={onFieldChange}
          placeholder="Street / Road Name"
        />
      </div>

      <div className="form-group inline-label pincode-row">
        <label htmlFor="pincode">Pincode</label>
        <input
          id="pincode"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="pincode-input"
          value={manualFields.pincode}
          onChange={onPincodeChange}
          placeholder="000000"
          maxLength={6}
        />
      </div>
    </>
  );
};
