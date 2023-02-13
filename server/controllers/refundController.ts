import { Request, Response } from "express";
import Refund, { IRefund } from "../models/refund";
import Employee from "../models/employee";
import { ERRORS } from "../constants/errors";
import { REFUNDSTATUS } from "../constants/refunds";
import { ROLES } from "../constants/employee";

// @desc    Get all refunds
// @route   GET /api/refunds
// @access  private agents
const getRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ status: REFUNDSTATUS.pending });
  res.send(refunds);
};

// @desc    Get refund by Id
// @route   GET /api/refunds/:id
// @access  public
const getRefundById = async (req: Request, res: Response) => {
  const issue = await Refund.findById(req.params.id);
  if (!issue) throw new Error(ERRORS.not_found);
  res.send(issue);
};

// @desc    Create a refund
// @route   POST /api/refunds
// @access  private client
const createRefund = async (req: Request, res: Response) => {
  const { order, user, products } = req.body;
  // Check if any product exists in already existing refund
  //****** Fix bugg order can exist in multiple refunds *******/
  const existingRefund = await Refund.findOne({ _id: order });
  if (existingRefund) {
    for (let product of products) {
      for (let refunProduct of existingRefund.products) {
        if (refunProduct.product == product) {
          throw new Error(ERRORS.product_already_exist_in_refund);
        }
      }
    }
  }
  const refund: Partial<IRefund> = {
    order,
    user,
    products,
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
    Employee.updateOne(
      { _id: createdRefund.agent },
      { processing: createdRefund._id }
    );
  }
  res.send(createdRefund);
};

// @desc    Get user refunds
// @route   GET /api/refunds/client-refund
// @access  private client
const getUserRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ user: res.locals.user.id });
  res.send(refunds);
};

// @desc    Get order refunds
// @route   GET /api/refunds/order/:id
// @access  public
const getOrderRefunds = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ order: req.params.id });
  res.send(refunds);
};

// @desc    Get order refund
// @route   GET /api/refunds/agent-refund
// @access  private agent
const getAgentRefund = async (req: Request, res: Response) => {
  const refunds = await Refund.find({ agent: res.locals.user.id });
  res.send(refunds);
};

// @desc    Delete refund
// @route   DELETE /api/refunds/:id
// @access  private client
const removeRefund = async (req: Request, res: Response) => {
  const cancelledRefund = await Refund.deleteOne({ _id: req.params.id });
  res.send({ message: "Refund deleted" });
};

// @desc    Update/resolve refund
// @route   PUT /api/refunds/:id
// @access  private agent
const resolveRefund = async (req: Request, res: Response) => {
  const { status } = req.body;

  const updatedRefund = await Refund.updateOne(
    {
      _id: req.params.id,
    },
    { status: status }
  );
  res.send({ message: "Refund updated successfuly", updatedRefund });
};

// @desc    Set an agent for refund
// @route   PUT /api/refunds/set-agent
// @access  private agent
const setRefundAgent = async (req: Request, res: Response) => {
  const existingRefund = await Refund.findOne({
    _id: req.params.id,
    status: REFUNDSTATUS.pending,
  });
  if (!existingRefund) {
    throw new Error(ERRORS.not_found);
  }
  existingRefund.agent = res.locals.user.id;
  existingRefund.save();
  res.send({ message: "Refund is all yours to handle" });
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
