import { Box, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ResolveRefund from "../components/agent/ResolveRefund";
import AssignRefund from "../components/agent/AssigenRefund";
import { useAgentContext } from "../context/agentContext";
const AgentDashboard = () => {
  return (
    <Stack spacing={2}>
      <ResolveRefund />
      <AssignRefund />
      <Outlet />
    </Stack>
  );
};

export default AgentDashboard;
