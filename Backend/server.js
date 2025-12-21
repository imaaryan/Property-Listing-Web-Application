import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/utils/connectDB.js";

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
      console.log("Server is Running on PORT: " + PORT);
    });
  } catch (error) {
    console.log("MONGO db connection failed !!! ", error);
  }
};

startServer();
