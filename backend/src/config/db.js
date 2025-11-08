import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/ecommerce_cart"; // local MongoDB
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully at", mongoURI);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;