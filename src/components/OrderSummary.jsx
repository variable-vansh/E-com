import React from "react";
import { formatOrderId, getExpectedDeliveryDate } from "../utils/orderUtils";
import { getGrainColor } from "../utils/colorUtils";
import "../styles/OrderSummaryNew.css";

export const OrderSummary = ({
  orderData,
  onBackToShopping,
  grainsData = [],
  productsData = [],
}) => {
  if (!orderData) {
    return (
      <div className="order-summary-error">
        <p>Order data not found</p>
        <button onClick={onBackToShopping} className="back-to-shopping-btn">
          Back to Shopping
        </button>
      </div>
    );
  }

  const {
    orderId,
    customerInfo,
    cartItems,
    cartMix,
    pricing,
    paymentMethod,
    orderStatus,
  } = orderData;

  const expectedDelivery = getExpectedDeliveryDate();

  return (
    <div className="order-summary-container">
      {/* Top Section - All key info in one rectangle */}
      <div className="order-summary-top">
        <div className="success-section">
          <div className="order-success-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div>
            <h1 className="order-success-title">Order Confirmed!</h1>
            <p className="order-success-subtitle">Thank you for your order.</p>
          </div>
        </div>

        <div className="delivery-info-section">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{customerInfo.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{customerInfo.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Address:</span>
            <span className="info-value">
              {customerInfo.address.fullAddress}
            </span>
          </div>
        </div>

        <div className="order-info-section">
          <div className="info-row">
            <span className="info-label">Order ID:</span>
            <span className="info-value order-id">
              {formatOrderId(orderId)}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Expected Delivery:</span>
            <span className="info-value">{expectedDelivery}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Payment Method:</span>
            <span className="info-value">
              {paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Two Columns */}
      <div className="order-summary-bottom">
        <div className="items-column">
          <div className="order-items-list">
            {/* Cart Mix */}
            {cartMix && cartMix.grains && cartMix.grains.length > 0 && (
              <div className="order-item mix-item">
                <div className="item-image-container">
                  {/* REPLACE THIS WITH YOUR GRAIN MIX SVG ICON */}
                  <img
                    src="/grain-mix-cart-icon.svg"
                    alt="Grain Mix"
                    width="60"
                    height="60"
                    className="mix-icon-img"
                  />
                  {/* 
                  Alternative inline SVG approach:
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="mix-icon-img">
                    // Your grain mix SVG paths here
                  </svg>
                  */}
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <span className="item-name">Custom Atta Mix</span>
                    <span className="item-price">
                      ₹
                      {cartMix.grains
                        .reduce((sum, grain) => sum + grain.totalPrice, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="mix-details">
                    {cartMix.grains.map((grain, index) => (
                      <div key={index} className="grain-detail">
                        <span className="grain-name">{grain.grainName}</span>
                        <span className="grain-quantity">
                          {grain.quantity}kg
                        </span>
                        <span className="grain-price">
                          ₹{grain.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Regular Products */}
            {cartItems &&
              cartItems.map((item, index) => {
                const product = productsData.find(
                  (p) => p.id === item.productId
                );
                return (
                  <div key={index} className="order-item product-item">
                    <div className="item-image-container">
                      {product && product.image ? (
                        <img
                          src={product.image}
                          alt={item.productName}
                          className="product-image"
                        />
                      ) : (
                        <div className="product-placeholder">
                          <span>{item.productName.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="item-content">
                      <div className="item-header">
                        <span className="item-name">{item.productName}</span>
                        <span className="item-price">
                          ₹{item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="item-details">
                        <span className="item-quantity">
                          Qty: {item.quantity}
                        </span>
                        <span className="item-unit-price">
                          @ ₹{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="details-column">
          {/* Bill Summary */}
          <div className="bill-summary-card">
            <div className="bill-details">
              <div className="bill-row">
                <span>Item Total:</span>
                <span>₹{pricing.itemTotal.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee:</span>
                <span>₹{pricing.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Discount:</span>
                <span>-₹{pricing.discount.toFixed(2)}</span>
              </div>
              <div className="bill-row total-row">
                <span>Total Amount:</span>
                <span>₹{pricing.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shop Contact */}
          <div className="shop-contact-card">
            <h4>Need Help?</h4>
            <div className="contact-details">
              <div className="contact-row">
                <span className="contact-label">Shop Phone:</span>
                <span className="contact-value">+91 98765 43210</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Support Email:</span>
                <span className="contact-value">support@grainstore.com</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">Business Hours:</span>
                <span className="contact-value">9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-summary-actions">
        <button onClick={onBackToShopping} className="back-to-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
