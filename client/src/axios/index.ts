import axios from "axios";
import { AgentDto, CredentialsType } from "../types";
import { RefundDtoType, RefundStatusType } from "../types/refund";

export let SERVER_URL = "https://customer-support.onrender.com/";

if (import.meta.env.DEV) {
  console.log("local host working");
  SERVER_URL = "http://localhost:3030/";
}

axios.defaults.baseURL = `${SERVER_URL}api`;

export function saveToken(token: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeToken() {
  axios.defaults.headers.common["Authorization"] = "";
}
/**
 *
 * AUTH REQUESTS
 *
 */
export const loginClient = (credentials: CredentialsType) =>
  axios.post("users/auth", credentials);

export const loginEmployee = (credentials: CredentialsType) =>
  axios.post("users/auth/employee", credentials);

export const authByOrderId = (orderId: string) =>
  axios.get(`/orders/authenticate/${orderId}`);

/**
 *
 * SUPPORT AGENTS REQUESTS
 *
 */
export const getRoles = () => axios.get("/users/roles");

export const getSupportAgents = () => axios.get("/users");

export const addAgent = (newAgent: AgentDto) => axios.post("/users", newAgent);

export const updateAgent = (id: string, updatedAgent: AgentDto) =>
  axios.patch(`/users/${id}`, updatedAgent);

export const deleteAgent = (agentId: string) =>
  axios.delete(`/users/${agentId}`);

/**
 *
 * ORDERS REQUESTS
 *
 */
export const getOrderById = (orderId: string) =>
  axios.get(`/orders/${orderId}`);

export const getMyOrders = () => axios.get("/orders/my-orders");

/**
 *
 * REFUNDS REQUESTS
 *
 */
export const getRefunds = () => axios.get("/refunds");

export const getRefundById = (refundId: string) =>
  axios.get(`/refunds/${refundId}`);

export const createRefund = (refundData: RefundDtoType) =>
  axios.post("/refunds", refundData);

export const removeRefund = (refundId: string) =>
  axios.delete(`/refunds/${refundId}`);

export const setAgent = (refundId: string) =>
  axios.get(`/refunds/set-agent/${refundId}`);

export const resolveRefund = (
  refundId: string,
  status: { status: RefundStatusType }
) => axios.patch(`/refunds/${refundId}`, status);

export const getClinetRefunds = () => axios.get("/refunds/client-refund");
export const getAgentRefund = () => axios.get("/refunds/agent-refund");
export const getOrdersRefunds = (orderId: string) =>
  axios.patch(`/refunds/order/${orderId}`);

/**
 *
 * PRODUCTS REQUESTS
 *
 */
export const getSingleProduct = async (productId: string) =>
  await axios.get(`/products/${productId}`);

export const getAllProducts = () => axios.get("/products");
