import express, { Request, Response, NextFunction } from "express";
require("express-async-errors");

import connect from "./db/connection";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { errorHandler } from "./errors/errorHandler";
import routes from "./routes";

const app = express();
app.use(express.json());

app.use(cors<Request>());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", routes.userRoutes);
app.use("/api/products", routes.productRoutes);
app.use("/api/orders", routes.orderRoutes);
app.use("/api/refunds", routes.refundRoutes);
app.use(routes.notFound);

app.use(errorHandler);

connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server running on port: ", process.env.PORT);
  });
});
