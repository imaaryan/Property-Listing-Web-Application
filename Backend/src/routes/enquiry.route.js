import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  markAsRead,
  markAsUnread,
  deleteEnquiry,
} from "../controllers/enquiry.controller.js";
import auth from "../middlewares/auth.middlewares.js";

const enquiryRouter = express.Router();

// Public Route
enquiryRouter.post("/add", createEnquiry);

// Admin Routes
enquiryRouter.get("/all", auth, getAllEnquiries);
enquiryRouter.patch("/:id/read", auth, markAsRead);
enquiryRouter.patch("/:id/unread", auth, markAsUnread);
enquiryRouter.delete("/:id", auth, deleteEnquiry);

export default enquiryRouter;
