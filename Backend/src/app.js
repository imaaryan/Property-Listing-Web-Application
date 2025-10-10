import express from "express";
import cors from "cors";

// importing routes
import healthRouter from "./routes/healthcheck.route.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// CORS Configration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use("/api/v1/healthcheck", healthRouter);

export default app;
