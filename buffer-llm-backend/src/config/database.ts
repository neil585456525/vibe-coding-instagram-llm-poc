import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/instagram-analyzer";

    await mongoose.connect(mongoUrl);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
    throw error;
  }
};
