import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as axios from "../axios";
import { RESMSGVAIRANTS } from "../constants/responseVariants";
import { AgentDto, AgentType, ResMsgVariantsType } from "../types";

type AdminContextType = {
  getSupportAgents: () => void;
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
      console.log("agents", res.data.users);
      setAdminState((prev) => ({ ...prev, agents: res.data.users }));
    } catch (error: any) {
      console.log("error getting support agents: ", error.response.data.error);
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
      console.log("agent added successfully:");
      getSupportAgents();
    } catch (error) {
      console.log("error adding agent");
    }
  };

  const removeAgent = async (id: string) => {
    try {
      const res = await axios.deleteAgent(id);
      console.log("agent deleted successfully");
      getSupportAgents();
    } catch (error) {
      console.log("error deleting agent");
    }
  };

  const updateAgent = async (id: string, agent: AgentDto) => {
    try {
      const res = await axios.updateAgent(id, agent);
      console.log("agent updated sucessfuly");
    } catch (error: any) {
      console.log("error updating agent: ", error.response.data.error);
    }
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
    console.log("use effect from admin context provider");
  }, []);
  const values = {
    getSupportAgents,
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
