const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://147.93.153.136/api";
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
}

export const apiService = new ApiService();
