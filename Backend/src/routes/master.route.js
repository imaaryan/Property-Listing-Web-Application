import express from "express";
import {
  addCity,
  getCities,
  updateCity,
  deleteCity,
  addArea,
  getAreas,
  updateArea,
  deleteArea,
  addAmenity,
  getAmenities,
  getPropertyTypes,
} from "../controllers/master.controller.js";
import auth from "../middlewares/auth.middlewares.js";

const masterRouter = express.Router();

// City Routes
masterRouter.post("/city", auth, addCity); // Admin only
masterRouter.get("/cities", getCities); // Public
masterRouter.delete("/city/:id", auth, deleteCity); // Admin only
masterRouter.put("/city/:id", auth, updateCity); // Admin only

// Area Routes
masterRouter.post("/area", auth, addArea); // Admin only
masterRouter.get("/areas", getAreas); // Public
masterRouter.delete("/area/:id", auth, deleteArea); // Admin only
masterRouter.put("/area/:id", auth, updateArea); // Admin only

// Amenity Routes
masterRouter.post("/amenity", auth, addAmenity); // Admin only
masterRouter.get("/amenities", getAmenities); // Public

// Property Type Routes
masterRouter.get("/property-types", getPropertyTypes);

export default masterRouter;
