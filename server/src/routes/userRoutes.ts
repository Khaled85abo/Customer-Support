import express, { Router } from "express";
import {
  activateAccount,
  authenticateClient,
  authenticateEmployee,
  createSupportAgent,
  deleteSupportAgent,
  getAllSupportAgents,
  getSupportAgentsById,
  getEmployeeRoles,
  updateSupportAgent,
} from "../controllers/userController";
import { validToken, isAdmin, isAgent } from "../middleware/auth";

const router: Router = express.Router();

// Admin create agents, get all agents
router
  .route("/")
  .post(validToken, isAdmin, createSupportAgent)
  .get(validToken, isAdmin, getAllSupportAgents);

router.get("/roles", validToken, isAdmin, getEmployeeRoles);

// Login  client
router.post("/auth", authenticateClient);

// Login  admin, agent
router.post("/auth/employee", authenticateEmployee);

router.post("/activate", validToken, isAgent, activateAccount);
// Admin removes/get/edit agents
router
  .route("/:id")
  .get(validToken, isAdmin, getSupportAgentsById)
  .patch(validToken, isAdmin, updateSupportAgent)
  .delete(validToken, isAdmin, deleteSupportAgent);

export default router;
