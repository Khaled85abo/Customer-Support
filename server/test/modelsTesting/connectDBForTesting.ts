import mongoose from "mongoose";

export async function connectDBForTesting() {
  try {
    const dbUri =
      "mongodb+srv://AnnaKhaled:TxwAGNr0N3nWlLJP@cluster0.55qre.mongodb.net/customerSupport?retryWrites=true&w=majority";
    // const dbName = "customerSupport";
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
