import { useAdminContext } from "../context/adminContext";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Alert, Grid, Button } from "@mui/material";

import ListComponent from "./List";
import { AgentType, RESMSGVAIRANTS, ResMsgVariantsType } from "../types";
import BasicModal from "./Modal";

const RemoveAgent = () => {
  const { adminState, removeAgent } = useAdminContext();
  const { agents } = adminState;
  const [agent, setAgent] = useState<AgentType | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleRemoveAgent = (agent: AgentType) => {
    console.log("handle remove agent: ", agent);
    console.log("agent id: ", agent._id);

    removeAgent(agent._id);
    setShowWarning(false);
  };

  const handleShowWarning = (agent: AgentType) => {
    setAgent(agent);
    setShowWarning(true);
  };
  return (
    <>
      {showWarning && agent && (
        <BasicModal close={setShowWarning}>
          <Alert severity="warning">This action can't be undone!</Alert>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => setShowWarning(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => handleRemoveAgent(agent)}>
                Sure! proceed
              </Button>
            </Grid>
          </Grid>
        </BasicModal>
      )}
      {agents && (
        <ListComponent
          agents={adminState.agents}
          action={{ type: "remove", func: handleShowWarning }}
        />
      )}
    </>
  );
};

export default RemoveAgent;