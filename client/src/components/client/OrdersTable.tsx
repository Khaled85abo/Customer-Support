import { useClientContext } from "../../context/clientContext";
import { OrderItemType, OrderType } from "../../types/order";
import { Typography, Alert, Box, Grid, Button, Stack } from "@mui/material";

const OrdersTable = () => {
  const {
    orders: { orders, error, loading },
  } = useClientContext();

  if (loading) {
    return <h5>LOADING...</h5>;
  }

  if (error) {
    return (
      <Alert sx={{ mt: 3 }} severity="error">
        {error}
      </Alert>
    );
  }

  return (
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
                <h4>{order.isPaid ? "Paid" : "Not paid yet "}</h4>
                <h4>
                  {order.isDelivered ? "Delivered" : "Not devliered yet "}
                </h4>
              </td>
              <td>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Img</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((orderItem: OrderItemType) => (
                        <tr key={orderItem._id}>
                          <td>
                            <img
                              height="60"
                              src={`http://localhost:3030/${orderItem.image}?w=164&h=164&fit=crop&auto=format`}
                              alt={orderItem.name}
                              loading="lazy"
                            />
                          </td>
                          <td>{orderItem.name}</td>
                          <td>{orderItem.qty}</td>
                          <td>{orderItem.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
