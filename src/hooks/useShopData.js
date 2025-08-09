import { useState, useEffect } from "react";
import {
  loadGrainsData,
  loadProductsData,
  loadCategoriesData,
} from "../data/shopData";

export const useShopData = () => {
  const [grainsData, setGrainsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [grains, products, categories] = await Promise.all([
        loadGrainsData(),
        loadProductsData(),
        loadCategoriesData(),
      ]);

      setGrainsData(grains);
      setProductsData(products);
      setCategoriesData(categories);
    } catch (err) {
      console.error("Error loading shop data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refetchData = async () => {
    await loadData();
  };

  return {
    grainsData,
    productsData,
    categoriesData,
    loading,
    error,
    refetchData,
  };
};
