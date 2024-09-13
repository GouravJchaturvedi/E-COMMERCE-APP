import { Router } from "express";
import {
  login,
  logout,
  signup,
  refreshToken,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/signup", signup);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.post("/refresh-token", refreshToken);

authRoute.get("/profile", protectRoute, getProfile);

export default authRoute;
