import { Router } from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const cartRoute = Router();

cartRoute.get("/", protectRoute, getCartProducts);
cartRoute.post("/", protectRoute, addToCart);
cartRoute.delete("/", protectRoute, removeAllFromCart);
cartRoute.put("/:id", protectRoute, updateQuantity);


export default cartRoute;
