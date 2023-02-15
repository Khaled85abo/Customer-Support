import { REFUNDSTATUS } from "../constants/refunds";
import { OrderItemType } from "./order";

export type RefundType = {
  _id: string;
  agent: string;
  user: string;
  orderItems: [
    {
      name: string;
      qty: number;
      image: string;
      price: number;
      product: string;
      _id: string;
    }
  ];
  order: string;
  status: RefundStatusType;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export type RefundDtoType = {
  order: string;
  orderItems: OrderItemType[];
};

export type RefundStatusType = typeof REFUNDSTATUS[keyof typeof REFUNDSTATUS];
