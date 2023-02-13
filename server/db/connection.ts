import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("Missign connection string to mongoDB Atlas");
    } else {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("from db connection file: Connected to mongoose");
    }
  } catch (e) {
    console.log("Error connecting to Mongo database: ", e);
  }
}
