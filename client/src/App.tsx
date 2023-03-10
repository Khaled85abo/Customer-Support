import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  NavLink,
} from "react-router-dom";
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
import AgentContextProvider, { useAgentContext } from "./context/agentContext";
import SnackbarInfo from "./components/Snackbar";

const ProtectedRoutes = () => {
  const location = useLocation();
  const {
    loginState: { role },
  } = useStateContext();

  useEffect(() => {}, [location.pathname]);

  if (role) {
    if (location.pathname.toLowerCase().includes(role)) {
      return <Outlet />;
    }
    return <Navigate to={`/${role}`} />;
  }
  return <Navigate to="/" />;
};

const AgentRoutes = () => {
  return (
    <>
      <AgentContextProvider>
        <Outlet />
      </AgentContextProvider>
    </>
  );
};

const ClientRoutes = () => {
  return (
    <>
      <ClientContextProvider>
        <Outlet />
      </ClientContextProvider>
    </>
  );
};

const AdminRoutes = () => {
  return (
    <>
      <AdminContextProvider>
        <Outlet />
      </AdminContextProvider>
    </>
  );
};

const NoMatch = () => {
  return <h2>No matching route</h2>;
};
function App() {
  const {
    showSnackbar: { message, show, severity },
    resetShowSnackbar,
  } = useStateContext();
  return (
    <div className="App">
      <ResponsiveAppBar />
      {show && (
        <SnackbarInfo
          close={resetShowSnackbar}
          message={message}
          severity={severity}
        />
      )}
      <Box
        sx={{
          maxWidth: 800,
          margin: "1rem  auto",
          overflow: { xs: "scroll", md: "hidden" },
        }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="support-agent" element={<AgentRoutes />}>
              <Route index element={<AgentDashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="client" element={<ClientRoutes />}>
              <Route index element={<ClientDashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="admin" element={<AdminRoutes />}>
              <Route index element={<AdminDashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
