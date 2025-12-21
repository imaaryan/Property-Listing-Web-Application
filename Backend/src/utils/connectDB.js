import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to Connect Database", error);
    process.exit(1);
  }
};

export default connectDB;
