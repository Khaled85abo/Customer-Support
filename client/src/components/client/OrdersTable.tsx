import { useClientContext } from "../../context/clientContext";
import { OrderItemType, OrderType } from "../../types/order";
import { Typography, Alert, Box, Grid, Button, Stack } from "@mui/material";
import { useState } from "react";
import RefundsCheckBoxList from "./RefundsCheckList";
import BasicModal from "../Modal";
import OrderItemsTable from "./OrderItemsTable";

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
  if (loading) {
    return (
      <Typography variant="h4" color="text.primary" align="center">
        LOADING...
      </Typography>
    );
  }

  if (error) {
    return (
      <Alert sx={{ mt: 3 }} severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <>
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
                  <Typography variant="h5">
                    {order.isPaid ? "Paid" : "Not paid yet "}
                  </Typography>
                  <Typography variant="h5">
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
          <RefundsCheckBoxList order={orderToRefund} close={resetRefundOrder} />
        </BasicModal>
      )}
    </>
  );
};

export default OrdersTable;
