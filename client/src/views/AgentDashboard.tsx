import { Stack } from "@mui/material";
import ResolveRefund from "../components/agent/ResolveRefund";
import AssignRefund from "../components/agent/AssigenRefund";
import { useAgentContext } from "../context/agentContext";
const AgentDashboard = () => {
  return (
    <Stack spacing={2}>
      <ResolveRefund />
      <AssignRefund />
    </Stack>
  );
};

export default AgentDashboard;
