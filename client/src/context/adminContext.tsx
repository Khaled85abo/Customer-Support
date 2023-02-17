import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as axios from "../axios";
import { RESMSGVAIRANTS } from "../constants/responseVariants";
import { ROLES } from "../constants/roles";
import { AgentDto, AgentType, ResMsgVariantsType } from "../types";
import { useStateContext } from "./stateContext";

type AdminContextType = {
  setResMessage: (variant: ResMsgVariantsType, message: string) => void;
  resetResMsg: () => void;
  adminState: AdminStateType;
  addAgent: (agent: AgentDto) => void;
  removeAgent: (id: string) => void;
  updateAgent: (id: string, agent: AgentDto) => void;
};

export type AdminStateType = {
  agents: AgentType[];
  roles: [];
  resMessage: { variant: ResMsgVariantsType | null; message: string };
};
const AdminContext = createContext<AdminContextType | null>(null);

export function useAdminContext() {
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    throw Error(
      "Error: check if your element is wrapped by StateContextProvider"
    );
  }
  return adminContext;
}

export default function AdminContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    loginState: { role },
  } = useStateContext();
  const [adminState, setAdminState] = useState<AdminStateType>({
    agents: [],
    roles: [],
    resMessage: { variant: null, message: "" },
  });
  const [resMsg, setResMsg] = useState<{
    type: ResMsgVariantsType;
    message: string;
  } | null>(null);

  const getSupportAgents = async () => {
    try {
      const res = await axios.getSupportAgents();
      setAdminState((prev) => ({ ...prev, agents: res.data.users }));
    } catch (error: any) {
      setAdminState((prev) => ({
        ...prev,
        resMessage: {
          variant: RESMSGVAIRANTS.error,
          message: error.response.data.error,
        },
      }));
    }
  };

  const addAgent = async (agent: AgentDto) => {
    try {
      const res = await axios.addAgent(agent);
      getSupportAgents();
    } catch (error) {}
  };

  const removeAgent = async (id: string) => {
    try {
      const res = await axios.deleteAgent(id);
      getSupportAgents();
    } catch (error) {}
  };

  const updateAgent = async (id: string, agent: AgentDto) => {
    try {
      const res = await axios.updateAgent(id, agent);
    } catch (error: any) {}
  };
  const setResMessage = (variant: ResMsgVariantsType, message: string) => {
    setAdminState((prev) => ({
      ...prev,
      resMessage: { variant, message },
    }));
  };
  const resetResMsg = () => {
    setAdminState((prev) => ({
      ...prev,
      resMessage: { variant: null, message: "" },
    }));
  };

  useEffect(() => {
    if (role == ROLES.admin) {
      getSupportAgents();
    }
  }, []);
  const values = {
    setResMessage,
    resetResMsg,
    adminState,
    addAgent,
    removeAgent,
    updateAgent,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
}
