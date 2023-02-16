import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Typography, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SupportPNG from "/support2.png";
import { useStateContext } from "../context/stateContext";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const {
    loginState: { role },
    logout,
  } = useStateContext();
  const navigate = useNavigate();
  const signout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "space-around" },
          }}>
          <Box
            component="img"
            sx={{
              objectFit: "cover",
              height: 100,
              width: 140,
              maxHeight: { xs: 100, md: 167 },
              maxWidth: { xs: 150, md: 200 },
            }}
            alt="At Your Service"
            src={SupportPNG}
          />
          {role && (
            <Box sx={{ textAlign: "right" }}>
              <Typography>Logged in as {role.toUpperCase()}</Typography>

              <Button sx={{ color: "white" }} variant="text" onClick={signout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
