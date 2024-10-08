import express from "express";
import { jwtMiddleware } from "../middlewares/auth";
import OrderController from "../controllers/orderController";

const router = express.Router();

router.get("/", jwtMiddleware, OrderController.getOrders);

router.post(
  "/checkout/create-checkout-session",
  jwtMiddleware,
  OrderController.createCheckoutSession as any
);

router.post("/checkout/webhook", OrderController.stripeWebHookHandler as any);

export default router;
