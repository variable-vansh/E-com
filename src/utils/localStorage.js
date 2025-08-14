// Local storage utility functions for cart management

// Storage keys
export const CART_STORAGE_KEY = "ecom-cart";
export const CART_MIX_STORAGE_KEY = "ecom-cart-mix";

/**
 * Load data from localStorage
 * @param {string} key - The localStorage key
 * @returns {Object} - The parsed data or empty object if error/not found
 */
export const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return {};
  }
};

/**
 * Save data to localStorage
 * @param {string} key - The localStorage key
 * @param {Object} data - The data to save
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Clear all cart data from localStorage
 */
export const clearCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CART_MIX_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error);
  }
};

/**
 * Load cart data from localStorage
 * @returns {Object} - Cart data object
 */
export const loadCartFromStorage = () => {
  return loadFromLocalStorage(CART_STORAGE_KEY);
};

/**
 * Load cart mix data from localStorage
 * @returns {Object} - Cart mix data object
 */
export const loadCartMixFromStorage = () => {
  return loadFromLocalStorage(CART_MIX_STORAGE_KEY);
};

/**
 * Save cart data to localStorage
 * @param {Object} cart - Cart data to save
 */
export const saveCartToStorage = (cart) => {
  saveToLocalStorage(CART_STORAGE_KEY, cart);
};

/**
 * Save cart mix data to localStorage
 * @param {Object} cartMix - Cart mix data to save
 */
export const saveCartMixToStorage = (cartMix) => {
  saveToLocalStorage(CART_MIX_STORAGE_KEY, cartMix);
};

/**
 * Clean invalid product IDs from cart data
 * @param {Object} cart - Cart data to clean
 * @param {Array} productsData - Array of valid products
 * @returns {Object} - Cleaned cart data
 */
export const cleanInvalidCartItems = (cart, productsData) => {
  if (!productsData?.length) return cart;

  const validProductIds = new Set(productsData.map((p) => p.id.toString()));
  const cleanedCart = {};

  Object.keys(cart).forEach((id) => {
    if (validProductIds.has(id.toString())) {
      cleanedCart[id] = cart[id];
    }
  });

  return cleanedCart;
};

/**
 * Clean invalid grain IDs from cart mix data
 * @param {Object} cartMix - Cart mix data to clean
 * @param {Array} grainsData - Array of valid grains
 * @returns {Object} - Cleaned cart mix data
 */
export const cleanInvalidMixItems = (cartMix, grainsData) => {
  if (!grainsData?.length) return cartMix;

  const validGrainIds = new Set(grainsData.map((g) => g.id.toString()));
  const cleanedMix = {};

  Object.keys(cartMix).forEach((id) => {
    if (validGrainIds.has(id.toString())) {
      cleanedMix[id] = cartMix[id];
    }
  });

  return cleanedMix;
};
