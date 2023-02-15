import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import ClientDashboard from "./views/ClientDashboard";
import AdminDashboard from "./views/AdminDashboard";
import AgentDashboard from "./views/AgentDashboard";
import { useEffect } from "react";
import { useStateContext } from "./context/stateContext";
import ResponsiveAppBar from "./components/AppBar";
import AdminContextProvider from "./context/adminContext";
import ClientContextProvider from "./context/clientContext";
import { Box } from "@mui/material";
import AgentContextProvider from "./context/agentContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const {
    loginState: { role },
  } = useStateContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!role) {
      navigate("/");
    } else if (location.pathname.toLowerCase().includes(role)) {
      navigate(`/${role}`);
    }
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />

      <Box
        sx={{
          maxWidth: 800,
          margin: "1rem  auto",
          overflow: { xs: "scroll", md: "hidden" },
        }}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/support-agent"
            element={
              <ProtectedRoute>
                <AgentContextProvider>
                  <AgentDashboard />
                </AgentContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/client"
            element={
              <ProtectedRoute>
                <ClientContextProvider>
                  <ClientDashboard />
                </ClientContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminContextProvider>
                  <AdminDashboard />
                </AdminContextProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
