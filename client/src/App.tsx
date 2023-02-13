import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import ClientDashboard from "./views/ClientDashboard";
import AdminDashboard from "./views/AdminDashboard";
import AgentDashboard from "./views/AgentDashboard";
import { useEffect } from "react";
import { useStateContext } from "./context/stateContext";
import { saveToken } from "./axios";

const agentToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGFuQHNlLnNlIiwibmFtZSI6ImpvaGFuIiwicm9sZSI6InN1cHBvcnQtYWdlbnQiLCJpZCI6IjYzZWE4YzgzNmVjNTUwZDNhMzZjMjRjMiIsImlhdCI6MTY3NjMzMTk3OSwiZXhwIjoxNjc2NDE4Mzc5fQ.zOWWcUOBXAObLpT6UGQRfiYOcobm1m7q1hAvMeYxffM";
const clientToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1QHNlLnNlIiwibmFtZSI6InN1Iiwicm9sZSI6ImNsaWVudCIsImlkIjoiNjNlOTVlNjI1YWY4NjQ0NDE2ZjFhNTkxIiwiaWF0IjoxNjc2MzMyMDI2LCJleHAiOjE2NzY0MTg0MjZ9.kW6WbIzFfFW56vHxmSUXrVEIjbNCYsDV7U6nTPH95Hk";
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHNlLnNlIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWQiOiI2M2U5NWU2MjVhZjg2NDQ0MTZmMWE1OTUiLCJpYXQiOjE2NzYzMzE4MDIsImV4cCI6MTY3NjQxODIwMn0.OKj41vNxpMbj1GihyAmp-UcjX6B1QV2Pf_gfRaHWdKQ";
saveToken(adminToken);
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, []);
  return children;
};

function App() {
  const { authorized } = useStateContext();
  return (
    <div className="App">
      {authorized ? "Authorized" : "Not authorized"}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent"
          element={
            <ProtectedRoute>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
