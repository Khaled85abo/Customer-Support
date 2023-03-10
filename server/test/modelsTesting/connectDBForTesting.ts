import mongoose from "mongoose";

export async function connectDBForTesting() {
  try {
    const dbUri = process.env.MONGODB_URL;
    // const dbName = "customerSupport";
    if (!dbUri) throw new Error("no MONGODB_URL found");
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUri);
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
