import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // --- Common Fields (Shared by both Buy and Rent) ---
    title: {
      type: String,
      required: [true, "Please add a property title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please add a short description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    images: {
      featuredImage: { type: String, required: true },
      imageGallery: [String],
    },
    // References to other models
    areaId: {
      type: mongoose.Schema.ObjectId,
      ref: "Area",
      required: true,
    },
    amenitiesId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Amenity",
      },
    ],

    propertyType: {
      type: String,
      required: true,
      enum: [
        "Residential Plot",
        "Independent House",
        "Commercial Shop",
        "Residential Apartment",
        "Independent Floor",
        "Commercial Office Space",
        "Villa",
        "Agricultural Land",
        "Guesthouse",
      ],
    },

    // --- The Discriminator Field ---
    propertyFor: {
      type: String,
      required: true,
      enum: ["Buy", "Rent"], // This determines the structure of 'pricing'
    },

    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    propertySize: { type: Number, required: true }, // In sq ft

    // --- Flexible Pricing Object ---
    // We define ALL possible fields here as optional.
    // The 'pre-save' hook below enforces which ones are required based on 'propertyFor'.
    pricing: {
      // --- Buy Specific Fields ---
      askingPrice: { type: Number },
      stampDutyPercentage: { type: Number },
      stampDutyCost: { type: Number },
      advocateFee: { type: Number },
      receiptFee: { type: Number },
      brokerCommissionPercentage: { type: Number },
      brokerCommissionCost: { type: Number },
      finelPricing: { type: Number },
      priceHistory: [
        {
          year: { type: Number },
          cost: { type: Number },
        },
      ],

      // --- Rent Specific Fields ---
      rentPerMonth: { type: Number },
      securityDeposit: { type: Number },
    },

    // Internal details
    khatuniDetails: {
      currentOwner: String,
      previousOwner: String,
      khasraNumber: String, // Can be number or string
      currentOwnerPhoneNumber: Number,
    },

    propertyDetails: {
      dimension: String,
      facing: String,
      widthOfFacingRoad: String,
      approvedBy: String,
      allowableConstructionStilt: String,
      ownership: String,
      landTitle: String,
      developmentStatus: String,
      lastLandTransaction: Date,
      underMDDA: Boolean,
      underNagarNigam: Boolean,
      waterSupply: Boolean,
      powerSupply: Boolean,
      loanAvailable: Boolean,
      address: String,
      furnishing: String, // Mostly for Rent
      avalabeFor: String, // Mostly for Rent
      availability: String, // Mostly for Rent
      whyConsider: String, // Mostly for Rent
      features: String, // Mostly for Rent
      society: String, // Mostly for Rent
    },

    locationOnMap: {
      latitude: Number,
      longitude: Number,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

import { validatePropertyPricing } from "../middlewares/propertyValidation.middleware.js";

// --- Validation Middleware (Pre-Save Hook) ---
propertySchema.pre("save", validatePropertyPricing);

export const Property = mongoose.model("Property", propertySchema);
