import express from "express";
const router = express.Router();
import {
  getOrderById,
  getMyOrders,
  authenticateByOrder,
} from "../controllers/orderController";
import { isClient, validToken } from "../middleware/auth";

router.get("/my-orders", validToken, isClient, getMyOrders);
router.get("/:id", getOrderById);
router.get("/authenticate/:id", authenticateByOrder);

export default router;
