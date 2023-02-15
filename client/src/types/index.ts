import { RESMSGVAIRANTS } from "../constants/responseVariants";

export type AgentType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  processing: string;
  activated: boolean;
};

export type newAgentType = {
  name: string;
  email: string;
  password: string;
};

export type CredentialsType = {
  email: string;
  password: string;
};
export type AgentDto = Partial<AgentType>;

export type ResMsgVariantsType =
  typeof RESMSGVAIRANTS[keyof typeof RESMSGVAIRANTS];
