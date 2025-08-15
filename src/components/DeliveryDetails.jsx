import { useState, useEffect, useRef } from "react";

// Single compact layout for delivery info
export const DeliveryDetails = ({
  addressDetails,
  onAddressChange,
  grandTotal = 0,
}) => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);
  const [manualFields, setManualFields] = useState({
    fullName: "",
    phone: "",
    houseNumber: "",
    street: "",
    pincode: "",
  });

  // Push composed address & other fields up (dummy logic)
  useEffect(() => {
    const { houseNumber, street, pincode, phone, fullName } = manualFields;
    const composite = [houseNumber, street, pincode].filter(Boolean).join(", ");
    onAddressChange({ target: { id: "address", value: composite } });
    onAddressChange({ target: { id: "pincode", value: pincode } });
    if (phone) onAddressChange({ target: { id: "phone", value: phone } });
    if (fullName)
      onAddressChange({ target: { id: "fullName", value: fullName } });
  }, [manualFields, onAddressChange]);

  const handleManualFieldChange = (e) => {
    const { id, value } = e.target;
    setManualFields((prev) => ({ ...prev, [id]: value }));
  };

  const phoneEntered = manualFields.phone.trim().length > 0;
  const isOtpComplete = otpValues.every((d) => d.length === 1);
  const highlightPayment =
    [
      manualFields.fullName,
      manualFields.phone,
      manualFields.houseNumber,
      manualFields.street,
      manualFields.pincode,
    ].every((v) => v.trim() !== "") && isOtpComplete;

  const handleSendOtp = () => {
    if (!phoneEntered) return;
    setShowOtpInputs(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 40);
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    setOtpValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < otpValues.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePincodeChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    setManualFields((prev) => ({ ...prev, pincode: digitsOnly }));
  };

  return (
    <div className="delivery-details simple-layout with-bg">
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter full name"
          value={manualFields.fullName}
          onChange={handleManualFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <div
          className={`phone-otp-row single-line ${
            showOtpInputs ? "with-otp" : ""
          }`}
        >
          <input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={manualFields.phone}
            onChange={handleManualFieldChange}
            maxLength={10}
            className="phone-input"
            disabled={showOtpInputs && isOtpComplete}
          />
          {showOtpInputs ? (
            <div className="otp-inline in-row" aria-label="Enter OTP">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="otp-input inline"
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  ref={(el) => (otpRefs.current[i] = el)}
                />
              ))}
            </div>
          ) : (
            <button
              type="button"
              className={`otp-send-btn ${phoneEntered ? "active" : ""}`}
              disabled={!phoneEntered}
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          )}
        </div>
        {showOtpInputs && !isOtpComplete && (
          <p className="otp-hint inline-hint below-row">
            Enter 4-digit code.{" "}
            <button type="button" className="link-btn">
              Resend
            </button>
          </p>
        )}
        {showOtpInputs && isOtpComplete && (
          <p className="otp-success inline-hint below-row">Verified (dummy)</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="houseNumber">House / Flat No.</label>
        <input
          id="houseNumber"
          value={manualFields.houseNumber}
          onChange={handleManualFieldChange}
          placeholder="E.g. 123A"
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          id="street"
          value={manualFields.street}
          onChange={handleManualFieldChange}
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
          onChange={handlePincodeChange}
          placeholder="000000"
          maxLength={6}
        />
      </div>
      <div
        className={`delivery-payment-bar sticky-bottom ${
          highlightPayment ? "active" : ""
        }`}
      >
        <button
          type="button"
          disabled={!highlightPayment}
          className="delivery-pay-btn"
        >
          {highlightPayment
            ? `Pay ₹${grandTotal.toFixed(2)}`
            : "Fill details to enable payment"}
        </button>
      </div>
    </div>
  );
};
