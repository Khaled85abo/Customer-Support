import { Request, Response } from "express";
import { CLIENTROLES } from "../constants/client";
import { ERRORS } from "../constants/errors";
import Order from "../models/order.model";
import Refund from "../models/refund.model";
import createToken from "../utils/createToken";

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  public
const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) throw new Error(ERRORS.not_found);
  res.json({ order });
};

// @desc    Get  user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ email: res.locals.user.email });
  res.json({ orders });
};

// @desc    Allow user to start a refund with only order number
// @route   GET /api/orders/authenticate/:id
// @access  public
const authenticateByOrder = async (req: Request, res: Response) => {
  //Send orders refunds
  const order = await Order.findOne({ _id: req.params.id });
  const refunds = await Refund.find({ order: req.params.id });
  const token = createToken({
    email: null,
    name: null,
    role: CLIENTROLES.client,
    id: null,
  });
  if (!order) {
    throw new Error(ERRORS.not_found);
  }
  res.json({
    refunds,
    order: {
      _id: order._id,
      orderItems: order.orderItems,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
    },
    token,
  });
};

export { getOrderById, getMyOrders, authenticateByOrder };
