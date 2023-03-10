import { useState } from "react";
import { useClientContext } from "../../context/clientContext";
import { RefundType } from "../../types/refund";
import { Typography, Alert, Button, Stack, Grid } from "@mui/material";
import OrderItemsTable from "../OrderItemsTable";
import { REFUNDSTATUS } from "../../constants/refunds";
import BasicModal from "../Modal";
import * as axios from "../../axios";
import NoData from "../NoData";
import ErrorDisplayData from "../ErrorDisplayData";
import Loading from "../Loading";
import FetchingDataWrapper from "../FetchingDataWrapper";
const RefundsTable = () => {
  const {
    refunds: { refunds, error, loading },
    getRefunds,
  } = useClientContext();

  const [refundId, setRefundId] = useState<string | null>(null);
  const [resError, setResError] = useState("");

  const resetRefundId = () => {
    setRefundId(null);
  };

  const resetResError = () => {
    setResError("");
  };

  const handleRemoveRefund = async () => {
    if (!refundId) return;
    try {
      await axios.removeRefund(refundId);
      resetRefundId();
      getRefunds();
    } catch (error: any) {
      setResError(error.response.body.error);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5" align="center" mt={1} mb={1}>
        Your refunds history
      </Typography>
      <FetchingDataWrapper
        error={error}
        loading={loading}
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
                    {/* Commented for testing purposes */}
                    {/* {(refund.status === REFUNDSTATUS.processing ||
                    refund.status === REFUNDSTATUS.pending) && (
                    <Button onClick={() => setRefundId(refund._id)}>
                      Cancel Refund
                    </Button>
                  )} */}
                    <Button onClick={() => setRefundId(refund._id)}>
                      Cancel Refund
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
            <Stack sx={{ textAlign: "center" }}>
              {resError && <Alert severity="error">{resError}</Alert>}
              <Alert severity="error">
                Are you sure you want to delete this refund request!
              </Alert>
              <Grid mt={1} container spacing={4}>
                <Grid item xs={6}>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={resetRefundId}>
                    Close
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="medium"
                    variant="contained"
                    color="error"
                    onClick={handleRemoveRefund}>
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </BasicModal>
        )}
      </FetchingDataWrapper>
    </>
  );
};

export default RefundsTable;
