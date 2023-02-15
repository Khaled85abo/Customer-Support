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

export const REFUNDSTATUS = {
  pending: "pending",
  accepted: "accepted",
  declined: "declined",
  processing: "processing",
} as const;
export type RefundStatusType = typeof REFUNDSTATUS[keyof typeof REFUNDSTATUS];
