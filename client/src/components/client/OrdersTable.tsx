import { useClientContext } from "../../context/clientContext";
import { OrderType } from "../../types/order";
import { Typography, Alert, Button } from "@mui/material";
import { useState } from "react";
import RefundsCheckBoxList from "./RefundsCheckList";
import BasicModal from "../Modal";
import OrderItemsTable from "../OrderItemsTable";
import Loading from "../Loading";
import ErrorDisplayData from "../ErrorDisplayData";
import NoData from "../NoData";
import FetchingDataWrapper from "../FetchingDataWrapper";

const OrdersTable = () => {
  const {
    orders: { orders, error, loading },
    refunds: { refundOrders },
  } = useClientContext();

  const [orderToRefund, setOrderToRefund] = useState<OrderType | null>(null);

  const setRefundOrder = (order: OrderType) => {
    setOrderToRefund(order);
  };
  const resetRefundOrder = () => {
    setOrderToRefund(null);
  };

  return (
    <>
      <Typography component="h1" variant="h5" align="center" mt={1} mb={1}>
        Your orders
      </Typography>

      <FetchingDataWrapper
        error={error}
        loading={loading}
        dataText="orders"
        dataArr={orders}>
        <table>
          <thead>
            <tr>
              <th>Order info</th>
              <th>Order items info</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order: OrderType) => (
                <tr key={order._id}>
                  <td>
                    <Typography variant="h6">
                      {order.isPaid ? "Paid" : "Not paid yet "}
                    </Typography>
                    <Typography variant="h6">
                      {order.isDelivered ? "Delivered" : "Not devliered yet "}
                    </Typography>

                    <Button size="small" onClick={() => setRefundOrder(order)}>
                      Refund order
                    </Button>
                  </td>
                  <td>
                    <OrderItemsTable orderItems={order.orderItems} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orderToRefund && (
          <BasicModal close={resetRefundOrder}>
            <RefundsCheckBoxList
              order={orderToRefund}
              close={resetRefundOrder}
            />
          </BasicModal>
        )}
      </FetchingDataWrapper>
    </>
  );
};

export default OrdersTable;
