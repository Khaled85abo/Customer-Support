import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const productSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export interface IProduct extends InferSchemaType<typeof productSchema> {}
const Product = mongoose.model("Product", productSchema);

export default Product;
