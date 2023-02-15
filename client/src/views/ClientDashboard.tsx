import { useClientContext } from "../context/clientContext";
import { Typography, Alert, Box, Grid, Button, Stack } from "@mui/material";
import MediaCard from "../components/client/ProductCard";
import { ProductType } from "../types/product";
import RefundsTable from "../components/client/RefundTable";
import OrdersTable from "../components/client/OrdersTable";

const ProductsGrid = ({ products }: { products: ProductType[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}>
      {products.map((product) => (
        <div key={product._id}>
          <MediaCard product={product} />
        </div>
      ))}
    </Box>
  );
};

const ClientDashboard = () => {
  return (
    <div>
      <RefundsTable />
      <OrdersTable />
    </div>
  );
};

export default ClientDashboard;
