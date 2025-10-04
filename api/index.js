// api/index.js
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const app = require("../app");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const uri = process.env.ATLASDB_URL;

  if (!uri) {
    console.error("❌ ATLASDB_URL is missing in env variables!");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error while connecting to MongoDB:", err);
  }
}

module.exports = async (req, res) => {
  await connectDB(); // connect only when needed
  const handler = serverless(app);
  return handler(req, res);
};
