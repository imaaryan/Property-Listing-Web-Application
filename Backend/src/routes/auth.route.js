import express from "express";
import { getDashboardStats } from "../controllers/auth.controller.js";
import adminLogin from "../controllers/auth.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/stats", getDashboardStats);

export default adminRouter;
