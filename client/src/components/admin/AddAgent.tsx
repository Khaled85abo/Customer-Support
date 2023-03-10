import { Button, Grid, Box, TextField, Typography, Alert } from "@mui/material";
import { useAdminContext } from "../../context/adminContext";
import * as axios from "../../axios";
import { useState } from "react";
import { newAgentType, ResMsgVariantsType } from "../../types";
import { RESMSGVAIRANTS } from "../../constants/responseVariants";
import validate from "../../customHooks/validations";
import { VALIDATIONS } from "../../constants/validations";
import useValidation from "../../customHooks/validations";
const AddAgent = () => {
  const { getSupportAgents } = useAdminContext();
  const [resMsg, setResMsg] = useState<{
    type: ResMsgVariantsType;
    message: string;
  } | null>(null);
  const [newAgent, setNewAgent] = useState<newAgentType>({
    name: "",
    email: "",
    password: "",
  });
  const [emailError, emailInfo] = useValidation({
    input: newAgent.name,
    validation: VALIDATIONS.email,
  });

  const updateFileds = (fields: Partial<newAgentType>) => {
    setNewAgent((prev) => {
      return { ...prev, ...fields };
    });
    setResMsg(null);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axios.addAgent(newAgent);
      setResMsg({
        message: res.data.message,
        type: RESMSGVAIRANTS.success,
      });
      getSupportAgents();
      setNewAgent({ name: "", password: "", email: "" });
    } catch (error: any) {
      setResMsg({
        message: error.response.data.error,
        type: RESMSGVAIRANTS.error,
      });
    }
  };

  return (
    <>
      <Typography component="h1" variant="h4">
        Add support agent
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, padding: 3 }}>
        {resMsg && (
          <Alert sx={{ mt: 3 }} severity={resMsg.type}>
            {resMsg.message}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="name"
          name="name"
          autoComplete="name"
          autoFocus
          value={newAgent.name}
          onChange={(e) => updateFileds({ name: e.target.value })}
        />

        <TextField
          error={emailError ? true : false}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={newAgent.email}
          onChange={(e) => updateFileds({ email: e.target.value })}
        />
        {emailError && <Alert severity="error">{emailError}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={newAgent.password}
          onChange={(e) => updateFileds({ password: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="confirmPassword"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Add Support Agent
        </Button>
      </Box>
    </>
  );
};

export default AddAgent;
