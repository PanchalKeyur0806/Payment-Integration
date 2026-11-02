import { Router } from "express";
import { createOrder } from "../controllers/payment.controller";

const router = Router();

router.get("/razorpay/", createOrder);

export default router;
