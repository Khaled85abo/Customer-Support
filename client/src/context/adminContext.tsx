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
  getSupportAgents: () => void;
  adminState: AdminStateType;
  addAgent: (agent: AgentDto) => void;
  removeAgent: (id: string) => void;
  updateAgent: (id: string, agent: AgentDto) => void;
};

export type AdminStateType = {
  agents: AgentType[];
  roles: [];
  error: string;
  loading: boolean;
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
    showSnackbarMessage,
  } = useStateContext();
  const [adminState, setAdminState] = useState<AdminStateType>({
    agents: [],
    roles: [],
    error: "",
    loading: false,
  });

  const getSupportAgents = async () => {
    setAdminState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getSupportAgents();
      setAdminState((prev) => ({ ...prev, agents: res.data.users }));
    } catch (error: any) {
      setAdminState((prev) => ({
        ...prev,
        error: error.response.data.error,
      }));
      showSnackbarMessage(
        RESMSGVAIRANTS.error,
        `Something went wrong! ${error.response.body.error}`
      );
    } finally {
      setAdminState((prev) => ({ ...prev, loading: false }));
    }
  };

  const addAgent = async (agent: AgentDto) => {
    try {
      const res = await axios.addAgent(agent);
      showSnackbarMessage(RESMSGVAIRANTS.success, res.data.message);
      getSupportAgents();
    } catch (error: any) {
      showSnackbarMessage(
        RESMSGVAIRANTS.error,
        `Something went wrong! ${error.response.body.error}`
      );
    }
  };

  const removeAgent = async (id: string) => {
    try {
      const res = await axios.deleteAgent(id);
      showSnackbarMessage(
        RESMSGVAIRANTS.success,
        "User has been deleted successfuly "
      );
      getSupportAgents();
    } catch (error: any) {
      showSnackbarMessage(
        RESMSGVAIRANTS.error,
        `Something went wrong! ${error.response.body.error}`
      );
    }
  };

  const updateAgent = async (id: string, agent: AgentDto) => {
    try {
      const res = await axios.updateAgent(id, agent);
      showSnackbarMessage(
        RESMSGVAIRANTS.success,
        "User has been updated successfuly "
      );
      getSupportAgents();
    } catch (error: any) {
      showSnackbarMessage(
        RESMSGVAIRANTS.error,
        `Something went wrong! ${error.response.body.error}`
      );
    }
  };

  useEffect(() => {
    if (role == ROLES.admin) {
      getSupportAgents();
    }
  }, []);
  const values = {
    getSupportAgents,

    adminState,
    addAgent,
    removeAgent,
    updateAgent,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
}
