import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as axios from "../axios";
import { RefundDtoType, RefundStatusType, RefundType } from "../types/refund";
type OrdersState = {
  loading: boolean;
  orders: [];
  error: string | null;
};

type RefundOrder = {
  status: RefundStatusType;
  refundItems: { _id: string; status: RefundStatusType }[];
};

type RefundsState = {
  loading: boolean;
  refunds: RefundType[];
  refundOrders: { [key: string]: RefundOrder };
  error: string | null;
};

type ClientContextType = {
  orders: OrdersState;
  refunds: RefundsState;
  getORders: () => void;
  getRefunds: () => void;
  number: number;
};

const ClientContext = createContext<ClientContextType | null>(null);

export function useClientContext() {
  const clientContext = useContext(ClientContext);
  if (!clientContext) {
    throw Error(
      "Error: check if your element is wrapped by StateContextProvider"
    );
  }
  return clientContext;
}

export default function ClientContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const number = 10;
  const [orders, setOrders] = useState<OrdersState>({
    loading: false,
    orders: [],
    error: null,
  });

  const [refunds, setRefunds] = useState<RefundsState>({
    loading: false,
    refunds: [],
    refundOrders: {},
    error: null,
  });

  const extractRefundOrders = (
    refunds: RefundType[]
  ): { [key: string]: RefundOrder } => {
    const refundOrders = refunds.reduce(
      (prev: { [key: string]: RefundOrder }, curr: RefundType) => {
        if (!prev[curr.order]) {
          prev[curr.order] = { status: curr.status, refundItems: [] };
        }
        for (let orderItem of curr.orderItems) {
          prev[curr.order].refundItems.push({
            _id: orderItem._id,
            status: curr.status,
          });
        }
        return prev;
      },
      {}
    );

    return refundOrders;
  };

  const getORders = async () => {
    setOrders((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getMyOrders();
      setOrders((prev) => ({ ...prev, orders: res.data.orders, error: null }));
    } catch (error: any) {
      setOrders((prev) => ({ ...prev, error: error.response.body.error }));
    } finally {
      setOrders((prev) => ({ ...prev, loading: false }));
    }
  };
  const getRefunds = async () => {
    setRefunds((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getClinetRefunds();
      setRefunds((prev) => ({
        ...prev,
        refunds: res.data.refunds,
        error: null,
        refundOrders: extractRefundOrders(res.data.refunds),
      }));
    } catch (error: any) {
      setRefunds((prev) => ({ ...prev, error: error.response.body.error }));
    } finally {
      setRefunds((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getORders();
    getRefunds();
  }, []);

  const values = {
    orders,
    refunds,
    getORders,
    getRefunds,
    number,
  };
  return (
    <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  );
}
