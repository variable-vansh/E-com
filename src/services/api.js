const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://147.93.153.136/api";
const COUPON_API_BASE_URL =
  import.meta.env.VITE_COUPON_API_BASE_URL || "http://localhost:3000/api";
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 5000;

class ApiService {
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchProducts() {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async fetchCategories() {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/categories`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async fetchGrains() {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/grains`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching grains:", error);
      return [];
    }
  }

  async fetchPromos(deviceType = null) {
    try {
      let url = `${API_BASE_URL}/promos/active`;

      // If deviceType is specified, use the device-specific endpoint
      if (deviceType && deviceType !== "BOTH") {
        url = `${API_BASE_URL}/promos/device/${deviceType}`;
      }

      const response = await this.fetchWithTimeout(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching promos:", error);
      return [];
    }
  }

  async getAllCoupons(type = null) {
    try {
      let url = `${COUPON_API_BASE_URL}/coupons`;
      if (type) {
        url += `?type=${type}&active=true`;
      }

      const response = await this.fetchWithTimeout(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.success ? data.data || [] : [];
    } catch (error) {
      console.error("Error fetching all coupons:", error);
      return [];
    }
  }

  async fetchAdditionalItemCoupons(orderAmount) {
    try {
      const response = await this.fetchWithTimeout(
        `${COUPON_API_BASE_URL}/coupons/additional-items?orderAmount=${orderAmount}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.success ? data.data || [] : [];
    } catch (error) {
      console.error("Error fetching additional item coupons:", error);
      // Return empty array to prevent undefined errors
      return [];
    }
  }

  async validateCoupon(code, orderAmount, userId = null) {
    try {
      const response = await this.fetchWithTimeout(
        `${COUPON_API_BASE_URL}/coupons/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code.toUpperCase(),
            orderAmount,
            ...(userId && { userId }),
          }),
        }
      );

      const data = await response.json();

      // Handle backend error responses
      if (!response.ok) {
        return {
          success: false,
          valid: false,
          message: data.error?.message || "Failed to validate coupon",
          error: data.error?.code || "VALIDATION_FAILED",
        };
      }

      // Backend returns success response
      if (data.success && data.valid) {
        return {
          success: true,
          valid: true,
          coupon: {
            ...data.coupon,
            // Ensure we have the required fields for frontend
            code: code.toUpperCase(),
            discountAmount: data.discountAmount,
          },
          discountAmount: data.discountAmount,
          message: data.message,
        };
      } else {
        return {
          success: false,
          valid: false,
          message: data.error?.message || "Invalid coupon",
          error: data.error?.code || "COUPON_INVALID",
        };
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      return {
        success: false,
        valid: false,
        message: "Failed to validate coupon. Please try again.",
        error: "NETWORK_ERROR",
      };
    }
  }

  async submitOrder(orderData) {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Return the order data with the generated order ID
      return {
        success: true,
        orderId: orderData.orderId, // Use the client-generated order ID
        data: result,
        ...orderData, // Include full order data for immediate use
      };
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
