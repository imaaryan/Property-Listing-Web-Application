import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  markAsRead,
} from "../controllers/enquiry.controller.js";
import auth from "../middlewares/auth.middlewares.js";

const enquiryRouter = express.Router();

// Public Route
enquiryRouter.post("/add", createEnquiry);

// Admin Routes
enquiryRouter.get("/all", auth, getAllEnquiries);
enquiryRouter.patch("/:id", auth, markAsRead);

export default enquiryRouter;
