import { Request, Response } from "express";
import Refund, { IRefund } from "../models/refund.model";
import Employee from "../models/employee.model";
import { ERRORS } from "../constants/errors";
import { REFUNDSTATUS } from "../constants/refunds";
import { ROLES } from "../constants/employee";

// @desc    Get all refunds
// @route   GET /api/refunds
// @access  private agents
const getRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ status: REFUNDSTATUS.pending });
  res.send({ refunds });
};

// @desc    Get refund by Id
// @route   GET /api/refunds/:id
// @access  public
const getRefundById = async (req: Request, res: Response) => {
  const refund = await Refund.findById(req.params.id);
  if (!refund) throw new Error(ERRORS.not_found);
  res.send({ refund });
};

// @desc    Create a refund
// @route   POST /api/refunds
// @access  private client
const createRefund = async (req: Request, res: Response) => {
  const { order, orderItems } = req.body;
  // Check if any product exists in already existing refund
  //****** Fix bugg order can exist in multiple refunds *******/
  const existingRefundsArray = await Refund.find({ order });
  if (existingRefundsArray.length > 0) {
    for (let orderItem of orderItems) {
      for (let existingRefund of existingRefundsArray) {
        for (let refundOrderItem of existingRefund.orderItems) {
          if (refundOrderItem.product == orderItem.product) {
            throw new Error(ERRORS.product_already_exist_in_refund);
          }
        }
      }
    }
  }
  const refund: Partial<IRefund> = {
    order,
    user: res.locals.user.id,
    orderItems,
    status: REFUNDSTATUS.pending,
  };
  // Find a free agent to process the refund
  const freeAgent = await Employee.findOne({
    role: ROLES.support_agent,
    processing: null,
  });
  if (freeAgent) {
    refund.agent = freeAgent._id;
    refund.status = REFUNDSTATUS.processing;
  }
  const createdRefund = await Refund.create(refund);

  // Assign the refund case to the agent
  if (createdRefund.agent) {
    await Employee.updateOne(
      { _id: createdRefund.agent },
      {
        processing: createdRefund._id,
      }
    );
  }
  res.send({ message: "Refund created successfully", refund: createdRefund });
};

// @desc    Get user refunds
// @route   GET /api/refunds/client-refund
// @access  private client
const getUserRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ user: res.locals.user.id });
  res.send({ refunds });
};

// @desc    Get order refunds
// @route   GET /api/refunds/order/:id
// @access  public
const getOrderRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ order: req.params.id });
  res.send({ refunds });
};

// @desc    Get order refund
// @route   GET /api/refunds/agent-refund
// @access  private agent
const getAgentRefund = async (req: Request, res: Response) => {
  const refunds = await Refund.find({
    agent: res.locals.user.id,
    status: REFUNDSTATUS.processing,
  });
  res.send({ refunds });
};

// @desc    Delete refund
// @route   DELETE /api/refunds/:id
// @access  private client
const removeRefund = async (req: Request, res: Response) => {
  const refund = await Refund.findOne({ _id: req.params.id });
  if (!refund) throw new Error(ERRORS.not_found);
  /**Comment for testing purposes */
  // if (
  //   refund.status == REFUNDSTATUS.accepted ||
  //   refund.status == REFUNDSTATUS.declined
  // )
  //   throw new Error(ERRORS.forbidden);
  if (refund.agent)
    await Employee.updateOne({ _id: refund.agent }, { processing: null });
  await Refund.deleteOne({ _id: req.params.id });
  res.send({ message: "Refund deleted" });
};

// @desc    Update/resolve refund
// @route   PUT /api/refunds/:id
// @access  private agent
const resolveRefund = async (req: Request, res: Response) => {
  const { status } = req.body;
  const refund = await Refund.findOne({ _id: req.params.id });
  if (!refund) throw new Error(ERRORS.not_found);

  await Employee.updateOne({ _id: refund.agent }, { processing: null });
  refund.status = status;
  refund.save();
  res.send({ message: "Refund updated successfuly", refund });
};

// @desc    Set an agent for refund
// @route   PUT /api/refunds/set-agent/:id
// @access  private agent
const setRefundAgent = async (req: Request, res: Response) => {
  const agentId = res.locals.user.id;

  const isPendingRefund = await Refund.findOne({
    _id: req.params.id,
    status: REFUNDSTATUS.pending,
  });
  if (!isPendingRefund) {
    throw new Error(ERRORS.not_found);
  }
  const agent = await Employee.findById(agentId);
  if (!agent) throw new Error();
  if (agent.processing) throw new Error(ERRORS.forbidden);

  isPendingRefund.agent = agentId;
  isPendingRefund.status = REFUNDSTATUS.processing;
  isPendingRefund.save();

  await Employee.updateOne(
    { _id: agentId },
    { processing: isPendingRefund._id }
  );
  res.send({
    message: "Refund is all yours to handle",
    refund: isPendingRefund,
  });
};
export {
  getRefunds,
  createRefund,
  getUserRefunds,
  getAgentRefund,
  getRefundById,
  removeRefund,
  resolveRefund,
  getOrderRefunds,
  setRefundAgent,
};

// Find the newest
// .findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//   console.log( post );
// });

// Find the latest
// .findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, post) {
//   console.log( post );
// });
