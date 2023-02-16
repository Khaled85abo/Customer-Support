import { useState } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import OrderItemsTable from "../OrderItemsTable";
import { REFUNDSTATUS } from "../../constants/refunds";
import { RefundStatusType, RefundType } from "../../types/refund";
import * as axios from "../../axios";
import BasicModal from "../Modal";
import { useAgentContext } from "../../context/agentContext";

const ResolveRefund = () => {
  const {
    myRefunds: { refunds },
    getMyRefunds,
    getRefunds,
  } = useAgentContext();
  const [refundId, setRefundId] = useState<string | null>(null);
  const [resError, setResError] = useState("");

  const resetRefundId = () => {
    setRefundId(null);
  };

  const resetResError = () => {
    setResError("");
  };

  const handleResolveRefund = async (status: RefundStatusType) => {
    if (!refundId) return;

    try {
      await axios.resolveRefund(refundId, { status });
      resetRefundId();
      getMyRefunds();
      getRefunds();
    } catch (error: any) {
      setResError(error.response.body.error);
    }
  };

  if (refunds.length == 0) {
    return (
      <Typography variant="h5" component="h2" align="center" mt={1} mb={1}>
        You don't have any refunds to resolve
      </Typography>
    );
  }
  return (
    <>
      <Typography variant="h5" component="h2" align="center" mt={1} mb={1}>
        Refund to resolve
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
                    Resolve Refund
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
          <Box sx={{ textAlign: "center" }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleResolveRefund(REFUNDSTATUS.declined)}>
                  decline
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleResolveRefund(REFUNDSTATUS.accepted)}>
                  Accept
                </Button>
              </Grid>
            </Grid>
          </Box>
        </BasicModal>
      )}
    </>
  );
};

export default ResolveRefund;
