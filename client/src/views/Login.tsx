import * as React from "react";
import { useState, useEffect } from "react";
import Copyright from "../components/Copyright";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStateContext } from "../context/stateContext";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme();

const ToggleAuth = ({
  isClient,
  setIsClient,
}: {
  isClient: boolean;
  setIsClient: (bol: boolean) => void;
}) => {
  return (
    <Grid container spacing={3} marginTop={3}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant={isClient ? "contained" : "outlined"}
          onClick={() => setIsClient(true)}>
          Customer
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant={isClient ? "outlined" : "contained"}
          onClick={() => setIsClient(false)}>
          Admin
        </Button>
      </Grid>
    </Grid>
  );
};

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClient, setIsClient] = useState(true);
  const {
    loginState: { isLoading, error, role },
    onSubmit,
    getRoles,
  } = useStateContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // getRoles();
    if (data.get("email") && data.get("password")) {
      onSubmit(isClient, data.get("email"), data.get("password"));
    }
  };

  useEffect(() => {
    if (role) {
      navigate("/" + role);
    }
  }, [role, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <ToggleAuth isClient={isClient} setIsClient={setIsClient} />

          <Grid
            container
            marginTop={3}
            sx={{ display: "grid", placeItems: "center" }}>
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
