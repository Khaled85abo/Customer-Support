import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connection";
import Order from "../models/order.model";
import { orders } from "./seedData/orders";
import Client from "../models/client.model";
import Employee from "../models/employee.model";
import Product from "../models/product.model";

import { products } from "./seedData/products";
import { clients, employees } from "./seedData/users";

// connectDB().then(async () => {
//   try {
// await Order.deleteMany();
// await Product.deleteMany();
// await Employee.deleteMany();
// await Client.deleteMany();

// const createdClients = await Client.insertMany(clients);
// const createdEmployees = await Employee.insertMany(employees);
// console.log("created employees: ", createdEmployees);

// Employee.insertMany(employees)
//   .then((docs) => console.log("created docs", docs))
//   .catch((err) => console.log("error creating employees: ", err));

// const adminUser = createdEmployees[0]._id;
// const sampleProducts = products.map((product) => {
//   return { ...product, user: adminUser };
// });

// await Product.insertMany(sampleProducts);

//     process.exit();
//   } catch (error) {
//     process.exit(1);
//   }
// });

// connectDB().then(async () => {
//   try {
//     await Order.deleteMany();
//     // const clients = await Client.find({});

//     // if (clients.length > 0) {
//     //   const newOrders = orders.map((order, index) => {
//     //     switch (index) {
//     //       case 0:
//     //         return { ...order, user: clients[0]._id };
//     //       case 1:
//     //         return { ...order, user: clients[1]._id };
//     //       default:
//     //         return { ...order, user: undefined };
//     //     }
//     //   });
//     //   await Order.insertMany({ newOrders });
//     // }

//     for (let order of orders) {
//       try {
//         await Order.create(order);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   } catch (error) {
//     console.log("error seeding orders: ", error);
//   }
// });

// npx ts-node src/db/seeder.ts
