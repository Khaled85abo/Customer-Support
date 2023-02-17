import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
  Navigate,
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

  useEffect(() => {
    console.log("protected routes: ", location.pathname, role);
  }, [location.pathname]);
  return role && location.pathname.toLowerCase().includes(role) ? (
    <Outlet />
  ) : role && !location.pathname.toLowerCase().includes(role) ? (
    <Navigate to={`/${role}`} />
  ) : (
    <Navigate to="/login" />
  );
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
const Resolve = () => {
  const {
    myRefunds: { refunds },
  } = useAgentContext();
  return (
    <div>
      <h2>Resolve a refund</h2>
      {JSON.stringify(refunds, null, 2)}
    </div>
  );
};
const Refunds = () => {
  return <h2>All refunds</h2>;
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/support-agent" element={<AgentRoutes />}>
              <Route path="/support-agent" element={<AgentDashboard />}>
                <Route
                  index
                  path="/support-agent/refunds"
                  element={<Refunds />}
                />
                <Route path="/support-agent/refunds" element={<Refunds />} />
                <Route path="/support-agent/resolve" element={<Resolve />} />
                <Route path="/support-agent/*" element={<NoMatch />} />
              </Route>
            </Route>
            <Route path="/client" element={<ClientRoutes />}>
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/client/*" element={<NoMatch />} />
            </Route>
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/*" element={<NoMatch />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
