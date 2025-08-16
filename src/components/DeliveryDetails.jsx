import { useState, useEffect, useRef } from "react";
import { apiService } from "../services/api";

// Single compact layout for delivery info
export const DeliveryDetails = ({
  addressDetails,
  onAddressChange,
  grandTotal = 0,
  cart = {},
  cartMix = {},
  grainsData = [],
  productsData = [],
}) => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  const handleOrderSubmission = async () => {
    if (!highlightPayment || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare order data
      const orderData = {
        customerInfo: {
          fullName: manualFields.fullName,
          phone: manualFields.phone,
          address: {
            houseNumber: manualFields.houseNumber,
            street: manualFields.street,
            pincode: manualFields.pincode,
            fullAddress: [
              manualFields.houseNumber,
              manualFields.street,
              manualFields.pincode,
            ]
              .filter(Boolean)
              .join(", "),
          },
        },
        cartItems: Object.keys(cart).map((productId) => {
          const product = productsData.find((p) => p.id == productId);
          return {
            productId: parseInt(productId),
            productName: product?.name || "Unknown Product",
            quantity: cart[productId],
            price: product?.price || 0,
            totalPrice: (product?.price || 0) * cart[productId],
          };
        }),
        cartMix:
          Object.keys(cartMix).length > 0
            ? {
                grains: Object.keys(cartMix).map((grainId) => {
                  const grain = grainsData.find((g) => g.id == grainId);
                  return {
                    grainId: parseInt(grainId),
                    grainName: grain?.name || "Unknown Grain",
                    quantity: cartMix[grainId],
                    price: grain?.price || 0,
                    totalPrice: (grain?.price || 0) * cartMix[grainId],
                  };
                }),
              }
            : null,
        pricing: {
          itemTotal: grandTotal - 40, // Assuming delivery fee is 40
          deliveryFee: 40,
          discount: 20,
          grandTotal: grandTotal,
        },
        orderTimestamp: new Date().toISOString(),
        paymentStatus: "pending",
        orderStatus: "confirmed",
      };

      console.log("Submitting order data:", orderData);

      const response = await apiService.submitOrder(orderData);

      console.log("Order submitted successfully:", response);
      setSubmitSuccess(true);

      // Optionally show success message or redirect
      setTimeout(() => {
        setSubmitSuccess(false);
        // You might want to close the cart or redirect here
      }, 3000);
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          onClick={handleOrderSubmission}
        >
          {isSubmitting
            ? "Processing..."
            : highlightPayment
            ? `Pay ₹${grandTotal.toFixed(2)}`
            : "Fill details to enable payment"}
        </button>
      </div>
    </div>
  );
};
