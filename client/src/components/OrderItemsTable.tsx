import { OrderItemType } from "../types/order";

const OrderItemsTable = ({ orderItems }: { orderItems: OrderItemType[] }) => {
  return (
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
          {orderItems.map((orderItem) => (
            <tr key={orderItem._id}>
              <td>
                <img
                  height="60"
                  src={`https://customer-support.onrender.com/${orderItem.image}?w=164&h=164&fit=crop&auto=format`}
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
  );
};

export default OrderItemsTable;
