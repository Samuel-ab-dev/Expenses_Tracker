import { setServers } from "node:dns/promises";
import "dotenv/config";
import mongoose from "mongoose";

setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URI;

  if (!mongoUrl) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
