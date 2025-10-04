import app from "../app.js";
import mongoose from "mongoose";
import serverless from "serverless-http";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.ATLASDB_URL;
    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error while connecting to MongoDB:", err);
  }
};

connectDB();

export const handler = serverless(app);
export default handler;
