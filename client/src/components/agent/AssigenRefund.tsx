import { useState, useEffect } from "react";
import { Typography, Alert, Button, Box, Grid, Stack } from "@mui/material";
import OrderItemsTable from "../OrderItemsTable";
import { REFUNDSTATUS } from "../../constants/refunds";
import { RefundStatusType, RefundType } from "../../types/refund";
import * as axios from "../../axios";
import BasicModal from "../Modal";
import { useAgentContext } from "../../context/agentContext";

const AssignRefund = () => {
  const {
    refunds: { refunds, error, loading },
    myRefunds,
    getMyRefunds,
    getRefunds,
  } = useAgentContext();
  const [refundId, setRefundId] = useState<string | null>(null);
  const [resError, setResError] = useState("");
  const [hasRefund, setHasRefund] = useState(true);
  const resetRefundId = () => {
    setRefundId(null);
  };

  const resetResError = () => {
    setResError("");
  };

  const handleAssignRefund = async () => {
    if (!refundId) return;

    try {
      await axios.setAgent(refundId);
      resetRefundId();
      getMyRefunds();
      getRefunds();
    } catch (error: any) {
      setResError(error.response.body.error);
    }
  };

  useEffect(() => {
    setHasRefund(myRefunds.refunds.length > 0);
  }, []);

  if (refunds.length == 0) {
    return (
      <Typography variant="h4" component="h1" align="center" mt={1} mb={1}>
        There are no refunds to show
      </Typography>
    );
  }
  return (
    <>
      <Typography variant="h4" component="h1" align="center" mt={1} mb={1}>
        All refunds
      </Typography>
      <table>
        <thead>
          <tr>
            <th>refund info</th>
            <th>refund items info</th>
          </tr>
        </thead>
        <tbody>
          {refunds.length > 0 &&
            refunds.map((refund: RefundType) => (
              <tr key={refund._id}>
                <td>
                  <Typography variant="h6">{refund.status}</Typography>

                  <Button onClick={() => setRefundId(refund._id)}>
                    Process this refund
                  </Button>
                </td>
                <td>
                  <OrderItemsTable orderItems={refund.orderItems} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {refundId && (
        <BasicModal close={resetRefundId}>
          <Stack spacing={1}>
            {!hasRefund && (
              <Alert severity="info">
                Are you sure you want to process this refund?
              </Alert>
            )}
            {hasRefund && (
              <Alert severity="info">
                Sorry, But can't process more than one cas at a time
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={resetRefundId}>
                  Cancel
                </Button>
              </Grid>
              {!hasRefund && (
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssignRefund()}>
                    Sure
                  </Button>
                </Grid>
              )}
            </Grid>
          </Stack>
        </BasicModal>
      )}
    </>
  );
};

export default AssignRefund;
