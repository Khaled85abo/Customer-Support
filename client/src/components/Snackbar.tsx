import * as React from "react";
import { useEffect } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import { ResMsgVariantsType } from "../types";
import { ReactNode } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Infobar({
  resMsg,
  children,
}: {
  resMsg: { variant: ResMsgVariantsType; message: string };
  children?: ReactNode;
}) {
  const { variant, message } = resMsg;
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleOpen = () => () => {
    setState((prev) => ({ ...prev, open: true }));
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 3000);
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}>
        <>
          {children ? (
            <Alert severity={variant}>{children}</Alert>
          ) : (
            <Alert severity={variant}>{message}</Alert>
          )}
        </>
      </Snackbar>
    </div>
  );
}
