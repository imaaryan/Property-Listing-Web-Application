import express from "express";
import {
  createProperty,
  getAllProperties,
  getStats,
  getPropertyById,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
  deleteProperties,
} from "../controllers/property.controller.js";
import auth from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validatePropertyPricingExpress } from "../middlewares/propertyValidation.middleware.js";

const propertyRouter = express.Router();

propertyRouter.post(
  "/add",
  auth,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "imageGallery", maxCount: 10 },
  ]),
  validatePropertyPricingExpress,
  createProperty
);

propertyRouter.get("/stats", getStats); // Public - Optimized for filters
propertyRouter.get("/get-all", getAllProperties); // Public
propertyRouter.get("/get/:id", getPropertyById); // Public

// Update Property (Admin)
propertyRouter.put(
  "/update/:id",
  auth,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "imageGallery", maxCount: 10 },
  ]),
  validatePropertyPricingExpress,
  updateProperty
);

// Delete Property (Admin)
propertyRouter.delete("/delete/:id", auth, deleteProperty);

// Bulk Actions
propertyRouter.put("/bulk/toggle-status", auth, togglePropertyStatus);
propertyRouter.post("/bulk/delete", auth, deleteProperties); // Using POST for bulk delete body

export default propertyRouter;
