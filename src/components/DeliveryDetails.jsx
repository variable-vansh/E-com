import React from "react";
import { useDeliveryForm } from "../hooks/useDeliveryForm";
import { useOrderSubmission } from "../hooks/useOrderSubmission";
import { PhoneOTPSection } from "./PhoneOTPSection";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { DeliveryFormFields } from "./DeliveryFormFields";
import { OrderSubmissionSection } from "./OrderSubmissionSection";

// Single compact layout for delivery info
export const DeliveryDetails = ({
  addressDetails,
  onAddressChange,
  grandTotal = 0,
  cart = {},
  cartMix = {},
  grainsData = [],
  productsData = [],
  onOrderSuccess, // New prop to handle successful order
}) => {
  // Use custom hooks for form state and order submission
  const {
    showOtpInputs,
    otpValues,
    paymentMethod,
    manualFields,
    phoneEntered,
    isOtpComplete,
    highlightPayment,
    handleManualFieldChange,
    handlePincodeChange,
    handleSendOtp,
    handleOtpChange,
    handlePaymentMethodChange,
    setShowOtpInputs,
  } = useDeliveryForm({ onAddressChange });

  const { isSubmitting, submitError, submitSuccess, submitOrder } =
    useOrderSubmission({
      cart,
      cartMix,
      grainsData,
      productsData,
      onOrderSuccess,
    });

  const handleOrderSubmission = async () => {
    if (!highlightPayment || isSubmitting) return;
    await submitOrder(manualFields, paymentMethod, grandTotal);
  };

  // Focus first OTP input after showing inputs
  const handleSendOtpClick = () => {
    handleSendOtp();
    setTimeout(() => {
      const firstOtpInput = document.querySelector(".otp-input");
      if (firstOtpInput) firstOtpInput.focus();
    }, 40);
  };

  return (
    <div className="delivery-details simple-layout with-bg">
      <DeliveryFormFields
        manualFields={manualFields}
        onFieldChange={handleManualFieldChange}
        onPincodeChange={handlePincodeChange}
      />

      <PhoneOTPSection
        phone={manualFields.phone}
        onPhoneChange={handleManualFieldChange}
        showOtpInputs={showOtpInputs}
        onSendOtp={handleSendOtpClick}
        otpValues={otpValues}
        onOtpChange={handleOtpChange}
        isOtpComplete={isOtpComplete}
      />

      <PaymentMethodSection
        paymentMethod={paymentMethod}
        onPaymentMethodChange={handlePaymentMethodChange}
      />

      <OrderSubmissionSection
        highlightPayment={highlightPayment}
        isSubmitting={isSubmitting}
        grandTotal={grandTotal}
        paymentMethod={paymentMethod}
        submitError={submitError}
        submitSuccess={submitSuccess}
        onOrderSubmit={handleOrderSubmission}
      />
    </div>
  );
};
