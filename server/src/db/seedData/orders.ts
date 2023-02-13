import { IOrder } from "../../models/order.model";

export const orders = [
  {
    user: undefined,
    email: "su@se.se",
    orderItems: [
      {
        name: "Sinus cap blue",
        qty: 3,
        image: "/images/sinus-cap-blue.png",
        price: 499,
        product: "63e95e625af8644416f1a598",
      },
      {
        name: "Sinus cap green",
        qty: 5,
        image: "/images/sinus-cap-green.png",
        price: 199,
        product: "63e95e625af8644416f1a599",
      },
    ],
    shippingAddress: {
      address: "staffans vag 11g",
      city: "Sollentuna",
      postalCode: "14152",
      country: "Sweden",
    },
    paymentMethod: "paypal",

    totalPrice: 1008,
    isPaid: true,
    isDelivered: true,
  },
  {
    user: undefined,
    email: "moa@se.se",
    orderItems: [
      {
        name: "Sinus skateboard polar",
        qty: 1,
        image: "/images/sinus-skateboard-polar.png",
        price: 499,
        product: "63e95e625af8644416f1a5a5",
      },
      {
        name: "Sinus hoodie purple",
        qty: 1,
        image: "/images/sinus-hoodie-purple.png",
        price: 199,
        product: "63e95e625af8644416f1a5a0",
      },
      {
        name: "Sinus hoodie ocean",
        qty: 1,
        image: "/images/sinus-hoodie-ocean.png",
        price: 200,
        product: "63e95e625af8644416f1a59f",
      },
      {
        name: "Sinus hoodie green",
        qty: 2,
        image: "/images/sinus-hoodie-green.png",
        price: 400,
        product: "63e95e625af8644416f1a59e",
      },
    ],
    shippingAddress: {
      address: "sveavagen 11k",
      city: "Stockholm",
      postalCode: "23412",
      country: "Sweden",
    },
    paymentMethod: "stripe",

    totalPrice: 1525,
    isPaid: true,
    isDelivered: true,
  },
  {
    user: undefined,
    email: "random@se.se",
    orderItems: [
      {
        name: "Sinus skateboard polar",
        qty: 1,
        image: "/images/sinus-skateboard-polar.png",
        price: 499,
        product: "63e95e625af8644416f1a5a5",
      },
      {
        name: "Sinus hoodie purple",
        qty: 1,
        image: "/images/sinus-hoodie-purple.png",
        price: 199,
        product: "63e95e625af8644416f1a5a0",
      },
      {
        name: "Sinus hoodie ocean",
        qty: 1,
        image: "/images/sinus-hoodie-ocean.png",
        price: 200,
        product: "63e95e625af8644416f1a59f",
      },
    ],
    shippingAddress: {
      address: "sveavagen 11k",
      city: "Stockholm",
      postalCode: "23412",
      country: "Sweden",
    },
    paymentMethod: "stripe",
    totalPrice: 1125.0,
    isPaid: true,
    isDelivered: true,
  },
];
