import dotenv from "dotenv";
import Client from "../models/client.model";
import Employee from "../models/employee.model";
import Order from "../models/order.model";
import Product from "../models/product.model";
import connectDB from "./connection";

import { products } from "./seedData/products";
import { clients, employees } from "./seedData/users";

dotenv.config();
connectDB().then(async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Employee.deleteMany();
    await Client.deleteMany();

    const createdClients = await Client.insertMany(clients);
    const createdEmployees = await Employee.insertMany(employees);
    // console.log("created employees: ", createdEmployees);

    // Employee.insertMany(employees)
    //   .then((docs) => console.log("created docs", docs))
    //   .catch((err) => console.log("error creating employees: ", err));

    const adminUser = createdEmployees[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    process.exit(1);
  }
});

export const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Employee.deleteMany();
    await Client.deleteMany();

    const createdUsers = await Client.insertMany(clients);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

// npx ts-node db/seeder.ts
