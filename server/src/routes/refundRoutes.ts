import express from "express";
const router = express.Router();
import {
  getRefunds,
  createRefund,
  getUserRefunds,
  getAgentRefund,
  getRefundById,
  removeRefund,
  resolveRefund,
  getOrderRefunds,
  setRefundAgent,
} from "../controllers/refundController";
import { validToken, isAdmin, isClient, isAgent } from "../middleware/auth";

router
  .route("/")
  .get(validToken, isAgent, getRefunds)
  .post(validToken, isClient, createRefund);

router.get("/client-refund", validToken, isClient, getUserRefunds);
router.get("/order/:id", getOrderRefunds);
router.get("/agent-refund", validToken, isAgent, getAgentRefund);
router.get("/set-agent/:id", validToken, isAgent, setRefundAgent);
router
  .route("/:id")
  .get(getRefundById)
  .delete(validToken, isClient, removeRefund)
  .patch(validToken, isAgent, resolveRefund);

export default router;
