import { Alert } from "@mui/material";

const ErrorDisplayData = ({ error }: { error: string }) => {
  return (
    <Alert sx={{ mt: 3 }} severity="error">
      {error}
    </Alert>
  );
};

export default ErrorDisplayData;
