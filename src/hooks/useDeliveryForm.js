import { useState, useEffect } from "react";

export const useDeliveryForm = ({ onAddressChange }) => {
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [paymentMethod, setPaymentMethod] = useState("pay");
  const [manualFields, setManualFields] = useState({
    fullName: "",
    phone: "",
    houseNumber: "",
    street: "",
    pincode: "",
  });

  // Push composed address & other fields up
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

  const handlePincodeChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    setManualFields((prev) => ({ ...prev, pincode: digitsOnly }));
  };

  const handleSendOtp = () => {
    if (manualFields.phone.trim().length > 0) {
      setShowOtpInputs(true);
    }
  };

  const handleOtpChange = (index, value) => {
    setOtpValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Computed values
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

  return {
    // State
    showOtpInputs,
    otpValues,
    paymentMethod,
    manualFields,
    phoneEntered,
    isOtpComplete,
    highlightPayment,
    // Handlers
    handleManualFieldChange,
    handlePincodeChange,
    handleSendOtp,
    handleOtpChange,
    handlePaymentMethodChange,
    setShowOtpInputs,
  };
};
