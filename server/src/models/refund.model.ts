import mongoose, { InferSchemaType } from "mongoose";
import { REFUNDSTATUS } from "../constants/refunds";

export type RefundStatusTypes = typeof REFUNDSTATUS[keyof typeof REFUNDSTATUS];

const refundSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      default: null,
      ref: "Employee",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Client",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    status: {
      type: String,
      default: REFUNDSTATUS.pending,
      enum: [...Object.keys(REFUNDSTATUS)],
      required: true,
    },
    userMessage: {
      type: String,
    },
    agentMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export interface IRefund extends InferSchemaType<typeof refundSchema> {}
const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
