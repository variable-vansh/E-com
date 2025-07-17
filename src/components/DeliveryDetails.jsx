import { useState } from "react";

export const DeliveryDetails = ({ addressDetails, onAddressChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="delivery-details">
      <div
        className="delivery-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>Delivery Details</h3>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
          ▼
        </span>{" "}
      </div>
      <div className={`delivery-form ${isExpanded ? "expanded" : ""}`}>
        <div className="form-group">
          <label htmlFor="address">Full Address</label>
          <textarea
            id="address"
            value={addressDetails.address}
            onChange={onAddressChange}
            placeholder="Enter your full address"
            rows="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              value={addressDetails.pincode}
              onChange={onAddressChange}
              placeholder="Enter pincode"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              value={addressDetails.phone}
              onChange={onAddressChange}
              placeholder="Enter contact number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
