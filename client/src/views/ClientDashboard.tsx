import { Button } from "@mui/material";

const ClientDashboard = () => {
  return (
    <div>
      <h1>Client dashboard</h1>
      <h1>Vite + React + + Typescript + MUI 5</h1>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
      <div>
        <ul>
          <li>Create a refund</li>
          <li>Remove a refund</li>
          <li>Delete Support Agent</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
