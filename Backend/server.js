import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/utils/connectDB.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is Running on PORT: " + PORT);
    });
  } catch (error) {
    console.log("MONGO db connection failed !!! ", error);
  }
};

startServer();
