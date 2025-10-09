import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    images: {
      featuredImage: { type: String, required: true },
      imageGallery: [{ type: String }],
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    amenitiesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
        required: true,
      },
    ],
    propertyType: {
      type: String,
      required: true,
      enum: [
        "Residential Plot",
        "Residential Apartment",
        "Independent House",
        "Commercial Plot",
        "Commercial Apartment",
        "Warehouse / Godown",
      ],
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    propertySize: {
      type: Number,
    },
    pricing: {
      rentPerMonth: { type: Number, required: true },
      securityDeposit: { type: Number },
    },
    ownerDetails: {
      currentOwner: { type: String },
      currentOwnerPhoneNumber: { type: Number },
    },
    propertyDetails: {
      furnishing: { type: String },
      avalabeFor: { type: String },
      availability: { type: String },
      whyConsider: { type: String },
      features: { type: String },
      society: { type: String },
      address: { type: String },
    },
    locationOnMap: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;
