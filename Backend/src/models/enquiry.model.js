import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, trim: true },
    address: { type: String, trim: true },
    propertyType: {
      type: String,
      enum: [
        "Residential Plot",
        "Residential Apartment",
        "Independent House",
        "Commercial Plot",
        "Commercial Apartment",
        "Warehouse / Godown",
      ],
      required: true,
    },
    message: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
