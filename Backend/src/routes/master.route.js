import express from "express";
import { addCity, getCities } from "../controllers/master.controller.js";
import auth from "../middlewares/auth.middlewares.js";

const masterRouter = express.Router();

// City Routes
masterRouter.post("/city", auth, addCity); // Admin only
masterRouter.get("/cities", getCities); // Public

export default masterRouter;
