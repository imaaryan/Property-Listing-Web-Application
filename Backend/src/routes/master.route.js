import express from "express";
import {
  addCity,
  getCities,
  addArea,
  getAreas,
  addAmenity,
  getAmenities,
} from "../controllers/master.controller.js";
import auth from "../middlewares/auth.middlewares.js";

const masterRouter = express.Router();

// City Routes
masterRouter.post("/city", auth, addCity); // Admin only
masterRouter.get("/cities", getCities); // Public

// Area Routes
masterRouter.post("/area", auth, addArea); // Admin only
masterRouter.get("/areas", getAreas); // Public

// Amenity Routes
masterRouter.post("/amenity", auth, addAmenity); // Admin only
masterRouter.get("/amenities", getAmenities); // Public

export default masterRouter;
