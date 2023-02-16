import * as React from "react";
import { useState } from "react";
import {
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Box,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { OrderType } from "../../types/order";
import { useClientContext } from "../../context/clientContext";
import * as axios from "../../axios";

export default function RefundsCheckList({
  order,
  close,
}: {
  order: OrderType;
  close: () => void;
}) {
  const {
    refunds: { refundOrders },
    getRefunds,
  } = useClientContext();
  const [checked, setChecked] = useState([-1]);
  const [error, setError] = useState("");
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleRequestRefund = async () => {
    const refundItems = order.orderItems.filter((item, itemIndex) =>
      checked.some((index) => index == itemIndex)
    );
    try {
      await axios.createRefund({ order: order._id, orderItems: refundItems });
      getRefunds();
      close();
    } catch (error: any) {
      setError(error.response.body.error);
    }
  };
  return (
    <Box>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {order.orderItems.map((orderItem, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(index)}
                  checked={checked.indexOf(index) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                  disabled={
                    refundOrders[order._id] &&
                    refundOrders[order._id].refundItems.some(
                      (refundItem) => refundItem._id == orderItem._id
                    )
                  }
                />
              }
              disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${orderItem.name}`}
                    src={`https://customer-support.onrender.com/${orderItem.image}`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${index}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Button onClick={handleRequestRefund} disabled={checked.length == 1}>
          Request Refund for the choosen items
        </Button>
        <Button onClick={close}>Cancel</Button>
      </Stack>
    </Box>
  );
}
