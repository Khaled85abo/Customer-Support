export const ADMINACTIONS = {
  add: "add",
  remove: "remove",
  edit: "edit",
} as const;
export type AdminActionsType = typeof ADMINACTIONS[keyof typeof ADMINACTIONS];

export const AGENTACTIONS = {
  resolve: "resolve",
} as const;

export type AgentActionsTypes = typeof AGENTACTIONS[keyof typeof AGENTACTIONS];

export const CLIENTACTIONS = {
  createRefund: "creat-refund",
  deleteRefund: "delete-refund",
} as const;

export type ClientActionsType =
  typeof CLIENTACTIONS[keyof typeof CLIENTACTIONS];
