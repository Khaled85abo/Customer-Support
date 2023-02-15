import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as axios from "../axios";
import { RefundsStateType } from "./clientContext";

type AgentContextType = {
  refunds: RefundsStateType;
  getRefunds: () => void;
  myRefunds: RefundsStateType;
  getMyRefunds: () => void;
};

const AgentContext = createContext<AgentContextType | null>(null);

export function useAgentContext() {
  const agentContext = useContext(AgentContext);
  if (!agentContext) {
    throw Error(
      "Error: check if your element is wrapped by StateContextProvider"
    );
  }
  return agentContext;
}

export default function AgentContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [refunds, setRefunds] = useState<RefundsStateType>({
    loading: false,
    error: "",
    refunds: [],
    refundOrders: {},
  });
  const [myRefunds, setMyRefunds] = useState<RefundsStateType>({
    error: "",
    refunds: [],
    loading: false,
    refundOrders: {},
  });
  const getRefunds = async () => {
    setRefunds((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getRefunds();
      setRefunds((prev) => ({ ...prev, refunds: res.data.refunds }));
    } catch (error: any) {
      setRefunds((prev) => ({ ...prev, error: error.response.body.error }));
    } finally {
      setRefunds((prev) => ({ ...prev, loading: false }));
    }
  };

  const getMyRefunds = async () => {
    setMyRefunds((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getAgentRefund();
      setMyRefunds((prev) => ({ ...prev, refunds: res.data.refunds }));
    } catch (error: any) {
      setMyRefunds((prev) => ({ ...prev, error: error.response.body.error }));
    } finally {
      setMyRefunds((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getRefunds();
    getMyRefunds();
  }, []);

  const values = {
    refunds,
    getRefunds,
    myRefunds,
    getMyRefunds,
  };
  return (
    <AgentContext.Provider value={values}>{children}</AgentContext.Provider>
  );
}
