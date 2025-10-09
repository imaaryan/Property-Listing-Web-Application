import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((error) => {
      console.error(error, "Failed to Connect Database");
    });
};

export default connectDB;