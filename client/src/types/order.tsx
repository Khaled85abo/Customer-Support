export type ShippingAddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
export type OrderItemType = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  _id: string;
};

export type OrderType = {
  shippingAddress: ShippingAddressType;
  _id: string;
  email: string;
  orderItems: OrderItemType[];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
  user: string;
};
