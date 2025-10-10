import { healthcheck } from "../controllers/healthcheck.controller.js";
import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", healthcheck);

export default healthRouter;
