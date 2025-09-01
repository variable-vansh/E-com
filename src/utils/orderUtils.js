/**
 * Generate a random 6-digit numeric order ID
 * @returns {string} 6-digit order ID (padded with leading zeros if needed)
 */
export const generateOrderId = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const orderId = Math.floor(Math.random() * (max - min + 1)) + min;
  return orderId.toString();
};

/**
 * Format order ID for display
 * @param {string} orderId
 * @returns {string} Formatted order ID with prefix
 */
export const formatOrderId = (orderId) => {
  return `#${orderId}`;
};

/**
 * Calculate expected delivery date (2 days from now)
 * @returns {string} Formatted delivery date
 */
export const getExpectedDeliveryDate = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  const options = {
    month: "short",
    day: "numeric",
  };

  return deliveryDate.toLocaleDateString("en-US", options);
};
