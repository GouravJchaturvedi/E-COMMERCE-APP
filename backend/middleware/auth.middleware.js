import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized Invalid access Token" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in auth middleware ", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized Invalid access Token" });
  }
};

export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied - Admin Only" });
  }
};
