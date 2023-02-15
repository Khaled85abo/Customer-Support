import {
  ADMINACTIONS,
  AGENTACTIONS,
  CLIENTACTIONS,
} from "../constants/actions";

export type AdminActionsType = typeof ADMINACTIONS[keyof typeof ADMINACTIONS];

export type AgentActionsTypes = typeof AGENTACTIONS[keyof typeof AGENTACTIONS];

export type ClientActionsType =
  typeof CLIENTACTIONS[keyof typeof CLIENTACTIONS];
