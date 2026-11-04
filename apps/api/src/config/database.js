import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) return mongoose.connection;

  mongoose.connection.on("connected", () => {
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to ${env.MONGODB_URI}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error("[Database] MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
    console.warn("[Database] MongoDB disconnected");
  });

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    return mongoose.connection;
  } catch (error) {
    console.error("[Database] Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

export async function disconnectDatabase() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}
