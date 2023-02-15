import { Stack } from "@mui/material";
import RefundsTable from "../components/client/RefundTable";
import OrdersTable from "../components/client/OrdersTable";

const ClientDashboard = () => {
  return (
    <Stack spacing={2}>
      <RefundsTable />
      <OrdersTable />
    </Stack>
  );
};

export default ClientDashboard;
