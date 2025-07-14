import { create } from "zustand";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.PROD 
  ? 'https://products-crud-app-backend-ywa6.onrender.com'
  : '/api';
axios.defaults.timeout = 10000;

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    const { name, price, image } = newProduct;
    if (!name || !image || !price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await axios.post("/api/products", newProduct);
      const createdProduct = res.data.data;

      set((state) => ({ products: [...state.products, createdProduct] }));

      return { success: true, message: "Product created successfully." };
    } catch (error) {
      console.error("Create product error:", error);
      const message = error.response?.data?.message || error.message || "Failed to create product.";
      return { success: false, message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await axios.get("/api/products");
      set({ products: res.data.data });
      return { success: true };
    } catch (error) {
      console.error("Fetch products error:", error);
      const message = error.response?.data?.message || error.message || "Failed to fetch products.";
      return { success: false, message };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await axios.delete(`/api/products/${pid}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: res.data.message };
    } catch (error) {
      console.error("Delete product error:", error);
      const message = error.response?.data?.message || error.message || "Failed to delete product.";
      return { success: false, message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const { name, price, image } = updatedProduct;
    if (!name || !price || !image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await axios.put(`/api/products/${pid}`, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? res.data.data : product
        ),
      }));
      return {
        success: true,
        message: res.data.message || "Product updated successfully.",
      };
    } catch (error) {
      console.error("Update product error:", error);
      const message = error.response?.data?.message || error.message || "Failed to update product.";
      return { success: false, message };
    }
  },
}));
