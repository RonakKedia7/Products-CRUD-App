import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Get all products
router.get("/", getProducts);

// Delete a product
router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
