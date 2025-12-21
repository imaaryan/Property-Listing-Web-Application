import express from "express";
import cors from "cors";

// importing routes
import healthRouter from "./routes/healthcheck.route.js";
import adminRouter from "./routes/auth.route.js";
import masterRouter from "./routes/master.route.js";
import propertyRouter from "./routes/property.route.js";
import enquiryRouter from "./routes/enquiry.route.js";
import connectDB from "./utils/connectDB.js";

// Call DB Connection for Serverless/Vercel environments
connectDB();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// CORS Configration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use("/api/v1/healthcheck", healthRouter);
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/master", masterRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/enquiries", enquiryRouter);

export default app;
