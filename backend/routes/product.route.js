import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const productRoute = Router();

productRoute.get("/", protectRoute, adminRoute, getAllProducts);
productRoute.get("/featured", getFeaturedProducts);
productRoute.get("/category/:category", getProductsByCategory);
productRoute.get("/recommendations", getRecommendedProducts);
productRoute.post("/", protectRoute, adminRoute, createProduct);
productRoute.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
productRoute.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRoute;
