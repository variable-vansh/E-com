/**
 * Device detection utilities for responsive promo banner
 */

import { useState, useEffect } from "react";

// Breakpoints for device detection
const BREAKPOINTS = {
  MOBILE_MAX: 768,
  TABLET_MAX: 1024,
};

/**
 * Detect device type based on multiple factors:
 * - Screen width
 * - User agent
 * - Touch capability
 * - Device pixel ratio
 */
export const detectDeviceType = () => {
  if (typeof window === "undefined") {
    // Server-side rendering fallback
    return "BOTH";
  }

  const screenWidth = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Primary detection based on screen width
  if (screenWidth <= BREAKPOINTS.MOBILE_MAX) {
    return "MOBILE";
  }

  // Secondary checks for edge cases
  // Check for mobile user agents even on larger screens (tablets in landscape, etc.)
  const mobileUserAgents = [
    "android",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "mobile",
  ];

  const isMobileUserAgent = mobileUserAgents.some((device) =>
    userAgent.includes(device)
  );

  // If it's a tablet-sized screen (768-1024px) with touch, consider context
  if (
    screenWidth <= BREAKPOINTS.TABLET_MAX &&
    (hasTouch || isMobileUserAgent)
  ) {
    return "MOBILE";
  }

  // Default to desktop for larger screens
  return "DESKTOP";
};

/**
 * Get responsive image breakpoint info for debugging
 */
export const getDeviceInfo = () => {
  if (typeof window === "undefined") {
    return {
      deviceType: "BOTH",
      screenWidth: 0,
      hasTouch: false,
      userAgent: "",
    };
  }

  return {
    deviceType: detectDeviceType(),
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    hasTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    userAgent: navigator.userAgent,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
};

/**
 * Hook for React components to listen to device type changes
 */
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() => detectDeviceType());

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = detectDeviceType();
      setDeviceType(newDeviceType);
    };

    // Listen to both resize and orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return deviceType;
};
