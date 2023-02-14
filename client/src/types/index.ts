export type AgentType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  processing: string;
  activated: true;
};

export type newAgent = {
  name: string;
  email: string;
  password: string;
};

export type CredentialsType = {
  email: string;
  password: string;
};
export type AgentDto = Partial<AgentType>;

export const RESMSGVAIRANTS = {
  error: "error",
  success: "success",
  info: "info",
  warning: "warning",
} as const;
export type ResMsgVariantsType =
  typeof RESMSGVAIRANTS[keyof typeof RESMSGVAIRANTS];
