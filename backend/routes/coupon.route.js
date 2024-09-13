import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const couponRoute = Router()

couponRoute.get("/" , protectRoute , getCoupon);
couponRoute.get("/validate" , protectRoute , validateCoupon);

export default couponRoute