import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Please provide a valid database URI");
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected in", NODE_ENV);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectToDB;
