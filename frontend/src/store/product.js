import { create } from "zustand";
import axios from "axios";

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
      return { success: false, message: "Failed to create product." };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await axios.get("/api/products");
      set({ products: res.data.data });
      return { success: true };
    } catch (error) {
      console.error("Fetch products error:", error);
      return { success: false, message: "Failed to fetch products." };
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
      return { success: false, message: "Failed to delete product." };
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
      return { success: false, message: "Failed to update product." };
    }
  },
}));
