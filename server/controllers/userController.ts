import { NextFunction, Request, Response } from "express";
import { CLIENTROLES } from "../constants/client";
import { ROLES } from "../constants/employee";
import { ERRORS } from "../constants/errors";
import Client from "../models/client";
import Employee from "../models/employee";
import createToken from "../utils/createToken";

// @desc    Authenticate employee => send token back
// @route   Post /api/users/login/employee
// @access  public
const authenticateEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });
  if (!user) throw new Error(ERRORS.invalid_cridentials);

  const isMatch = await user.validatePassword(password);
  if (!isMatch) throw new Error(ERRORS.invalid_cridentials);

  const token = createToken({
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id,
  });
  res.json({ token });
};

// @desc    Authenticate a client => send token back
// @route   Post /api/users/login
// @access  public
const authenticateClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Client.findOne({ email });
  if (!user) throw new Error(ERRORS.invalid_cridentials);

  const isMatch = await user.validatePassword(password);
  if (!isMatch) throw new Error(ERRORS.invalid_cridentials);

  const token = createToken({
    email: user.email,
    name: user.name,
    role: CLIENTROLES.client,
    id: user._id,
  });
  res.json({ token });
};

// @desc    Create a support agent
// @route   Post /api/users/
// @access  private/ admin
const createSupportAgent = async (req: Request, res: Response) => {
  // Add validation to confirm the email belongs to the agent work email not another email
  const { email, name, password } = req.body;
  // const password = Math.random().toString(36).slice(-8);
  const user = await Employee.create({
    email,
    name,
    password,
    role: [ROLES.support_agent],
  });

  // Send an email to the agent with email and password
  // In first login the agent have to update the password

  res.json({
    message: "Support Agent created!",
    user,
  });
};

// @desc    Get all Support agents
// @route   get /api/users/
// @access  private/ admin
const getAllSupportAgents = async (req: Request, res: Response) => {
  const users = await Employee.find({ role: ROLES.support_agent });
  res.json({ users });
};

// @desc    Get Support agent by Id
// @route   get /api/users/:id
// @access  private/ admin
const getAllSupportAgentsById = async (req: Request, res: Response) => {
  const user = await Employee.findOne({ _id: req.params.id });
  res.json({ user });
};

// @desc    Update a support agent
// @route   put /api/users/:id
// @access  private/ admin
const updateSupportAgent = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await Employee.findById(req.params.id);
  if (!user) {
    throw new Error(ERRORS.not_found);
  }
  user.name = name;
  await user.save();
  res.json({ message: "Agent updated" });
};

// @desc    Delete a support agent
// @route   delete /api/users/:id
// @access  private/ admin
const deleteSupportAgent = async (req: Request, res: Response) => {
  await Employee.deleteOne({ _id: req.params.id });
  res.json({ message: "support agent deleted" });
};

// @desc    Get all employee roles
// @route   get /api/users/roles
// @access  private/ admin
const getEmployeeRoles = (req: Request, res: Response) => {
  res.send({ ROLES });
};

export {
  authenticateEmployee,
  authenticateClient,
  createSupportAgent,
  getAllSupportAgents,
  getAllSupportAgentsById,
  updateSupportAgent,
  deleteSupportAgent,
  getEmployeeRoles,
};
