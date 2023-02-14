import axios from "axios";
import { AgentDto, CredentialsType } from "../types";

axios.defaults.baseURL = "http://localhost:3030/api";

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

export const getMyOrders = () => axios.get("/orders/m-orders");

/**
 *
 * REFUNDS REQUESTS
 *
 */
export const getRefunds = () => axios.get("/refunds");

export const getRefundById = (refundId: string) =>
  axios.get(`/refunds/${refundId}`);
// export const createRefund = (refundData) => axios.post("/refunds", refundData);

export const removeRefund = (refundId: string) => axios.delete("/refunds");

export const setAgent = (refundId: string) =>
  axios.get(`/refunds/set-agent/${refundId}`);

export const resolveRefund = (refundId: string, status: { status: string }) =>
  axios.post(`/refunds/`);

export const getClinetRefunds = () => axios.get("/refunds/client-refund");
export const getAgentRefund = () => axios.get("/refunds/agent-refund");
export const getOrdersRefunds = (orderId: string) =>
  axios.patch(`/refunds/order/${orderId}`);

/**
 *
 * PRODUCTS REQUESTS
 *
 */
// export const getSingleProduct = async (productId) =>
//   await axios.get(`/products/${productId}`);
