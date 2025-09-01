import React, { useState, useRef } from "react";

export const PhoneOTPSection = ({
  phone,
  onPhoneChange,
  showOtpInputs,
  onSendOtp,
  otpValues,
  onOtpChange,
  isOtpComplete,
}) => {
  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    onOtpChange(index, value);
    if (value && index < otpValues.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const phoneEntered = phone.trim().length > 0;

  return (
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
          value={phone}
          onChange={onPhoneChange}
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
            onClick={onSendOtp}
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
  );
};
