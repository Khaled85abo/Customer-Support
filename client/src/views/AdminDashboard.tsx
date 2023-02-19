import { Button, Grid, Box } from "@mui/material";

import { useEffect, useState } from "react";
import AddAgent from "../components/admin/AddAgent";
import EditAgent from "../components/admin/EditAgent";
import RemoveAgent from "../components/admin/RemoveAgent";
import { ADMINACTIONS } from "../constants/actions";
import { useAdminContext } from "../context/adminContext";
import { AdminActionsType } from "../types/actions";

const AdminDashboard = () => {
  const { adminState } = useAdminContext();
  const [action, setAction] = useState<AdminActionsType>(ADMINACTIONS.add);

  return (
    <div>
      <nav>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            padding: "1rem",
          }}>
          <Grid item xs={4}>
            <Button
              variant={action == ADMINACTIONS.add ? "contained" : "outlined"}
              onClick={() => setAction(ADMINACTIONS.add)}>
              Add Agent
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant={action == ADMINACTIONS.remove ? "contained" : "outlined"}
              onClick={() => setAction(ADMINACTIONS.remove)}>
              Remove Agent
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant={action == ADMINACTIONS.edit ? "contained" : "outlined"}
              onClick={() => setAction(ADMINACTIONS.edit)}>
              Edit Agent
            </Button>
          </Grid>
        </Grid>
      </nav>
      <Box
        sx={{
          textAlign: "center",
          margin: " 2rem auto 0 auto",
          maxWidth: "500px",
        }}>
        {action == ADMINACTIONS.add && <AddAgent />}
        {action == ADMINACTIONS.remove && <RemoveAgent />}
        {action == ADMINACTIONS.edit && <EditAgent />}
      </Box>
    </div>
  );
};

export default AdminDashboard;
