import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cartRoute from "./routes/cart.route.js";
import couponRoute from "./routes/coupon.route.js";
import paymentRoute from "./routes/payment.route.js";
import analyticsRoute from "./routes/analytics.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({limit : "10mb"}));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupons", couponRoute); 
app.use("/api/payments", paymentRoute); //Need to implement this by RazorPay
app.use("/api/analytics" , analyticsRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("app started on port : ", PORT);
});
