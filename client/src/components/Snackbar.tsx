import * as React from "react";
import { Button, Alert } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { ResMsgVariantsType } from "../types";

export interface State extends SnackbarOrigin {
  open: boolean;
}

// const action = (
//   <Button color="secondary" size="small">
//     lorem ipsum dolorem
//   </Button>
// );

type SnackbarProps = {
  severity: ResMsgVariantsType;
  message: string;
  close: () => void;
  action?: () => void;
  actionMessage?: string;
  timing?: number;
};
export default function SnackbarInfo({
  severity,
  message,
  close,
  action,
  actionMessage,
  timing = 4000,
}: SnackbarProps) {
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  //   const handleClose = () => {
  //     setState({ ...state, open: false });
  //     close()
  //   };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, open: false });
    close();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={timing}
      message="I love snacks"
      key={vertical + horizontal}
      action={action && <Button onClick={action}>{actionMessage}</Button>}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
