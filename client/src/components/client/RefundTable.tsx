import { useClientContext } from "../../context/clientContext";
import { RefundType } from "../../types/refund";
import { Typography, Alert } from "@mui/material";

const RefundsTable = () => {
  const {
    refunds: { refunds, error, loading },
  } = useClientContext();

  if (loading) {
    return (
      <Typography variant="body2" color="text.primary" align="center">
        LOADING...
      </Typography>
    );
  }
  if (error) {
    return (
      <Alert sx={{ mt: 3 }} severity="error">
        {error}
      </Alert>
    );
  }

  return (
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
                <h4>{refund.status}</h4>
              </td>
              <td>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Img</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refund.orderItems.map((orderItem) => (
                        <tr key={orderItem._id}>
                          <td>
                            <img
                              height="60"
                              src={`http://localhost:3030/${orderItem.image}?w=164&h=164&fit=crop&auto=format`}
                              alt={orderItem.name}
                              loading="lazy"
                            />
                          </td>
                          <td>{orderItem.name}</td>
                          <td>{orderItem.qty}</td>
                          <td>{orderItem.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default RefundsTable;
