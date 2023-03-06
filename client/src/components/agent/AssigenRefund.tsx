import { useState, useEffect } from "react";
import { Typography, Alert, Button, Box, Grid, Stack } from "@mui/material";
import OrderItemsTable from "../OrderItemsTable";
import { RefundType } from "../../types/refund";
import * as axios from "../../axios";
import BasicModal from "../Modal";
import { useAgentContext } from "../../context/agentContext";
import { useStateContext } from "../../context/stateContext";
import { RESMSGVAIRANTS } from "../../constants/responseVariants";
import Loading from "../Loading";
import NoData from "../NoData";
import ErrorDisplayData from "../ErrorDisplayData";
import FetchingDataWrapper from "../FetchingDataWrapper";

const AssignRefund = () => {
  const {
    refunds: { refunds, error, loading },
    myRefunds,
    getMyRefunds,
    getRefunds,
  } = useAgentContext();
  const { showSnackbarMessage } = useStateContext();
  const [refundId, setRefundId] = useState<string | null>(null);
  const [hasRefund, setHasRefund] = useState(true);
  const resetRefundId = () => {
    setRefundId(null);
  };

  const handleAssignRefund = async () => {
    if (!refundId) return;

    try {
      const res = await axios.setAgent(refundId);
      showSnackbarMessage(RESMSGVAIRANTS.success, res.data.message);
      resetRefundId();
      getMyRefunds();
      getRefunds();
    } catch (error: any) {
      showSnackbarMessage(RESMSGVAIRANTS.error, error.response.body.error);
    }
  };

  useEffect(() => {
    setHasRefund(myRefunds.refunds.length > 0);
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5" align="center" mt={1} mb={1}>
        All available refunds
      </Typography>

      <FetchingDataWrapper
        loading={loading}
        error={error}
        dataText="refunds"
        dataArr={refunds}>
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
      </FetchingDataWrapper>
    </>
  );
};

export default AssignRefund;
