import express, { Router } from "express";
import {
  authenticateClient,
  authenticateEmployee,
  createSupportAgent,
  deleteSupportAgent,
  getAllSupportAgents,
  getAllSupportAgentsById,
  getEmployeeRoles,
  updateSupportAgent,
} from "../controllers/userController";
import { validToken, isAdmin } from "../middleware/auth";

const router: Router = express.Router();

// Admin create agents, get all agents
router
  .route("/")
  .post(validToken, isAdmin, createSupportAgent)
  .get(validToken, isAdmin, getAllSupportAgents);

router.get("/roles", getEmployeeRoles);

// Login  client
router.post("/login", authenticateClient);

// Login  admin, agent
router.post("/login/employee", authenticateEmployee);

// Admin removes/get/edit agents
router
  .route("/:id")
  .get(validToken, isAdmin, getAllSupportAgentsById)
  .put(validToken, isAdmin, updateSupportAgent)
  .delete(validToken, isAdmin, deleteSupportAgent);

export default router;
