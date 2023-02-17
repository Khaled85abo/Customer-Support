import { Box, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ResolveRefund from "../components/agent/ResolveRefund";
import AssignRefund from "../components/agent/AssigenRefund";
import { useAgentContext } from "../context/agentContext";
const AgentDashboard = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ textAlign: "center" }}>
        <Link to="/support-agent/refunds">
          <Typography component="span" marginRight={2}>
            Refunds
          </Typography>
        </Link>
        <Link to="/support-agent/resolve">
          <Typography component="span" marginRight={2}>
            Resolve
          </Typography>
        </Link>
        <Link to="/client">
          <Typography component="span" marginRight={2}>
            Client
          </Typography>
        </Link>
        <Link to="/admin">
          <Typography component="span" marginRight={2}>
            Admin
          </Typography>
        </Link>
      </Box>
      <ResolveRefund />
      <AssignRefund />
      <Outlet />
    </Stack>
  );
};

export default AgentDashboard;
