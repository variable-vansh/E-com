import { apiService } from "../services/api.js";
import {
  transformProducts,
  transformGrains,
  getUniqueCategories,
} from "../utils/dataTransform.js";

// Data loading functions
export const loadGrainsData = async () => {
  const apiGrains = await apiService.fetchGrains();
  return transformGrains(apiGrains);
};

export const loadProductsData = async () => {
  const apiProducts = await apiService.fetchProducts();
  return transformProducts(apiProducts);
};

export const loadCategoriesData = async () => {
  const apiProducts = await apiService.fetchProducts();
  const transformedProducts = transformProducts(apiProducts);
  return getUniqueCategories(transformedProducts);
};
