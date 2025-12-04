import express from "express";
import adminLogin from "../controllers/auth.controller";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

export default adminRouter;