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
      featuredImage: {
        type: String,
        required: [true, "Featured Image is required"],
      },
      imageGallery: [String],
    },
    // References to other models
    areaId: {
      type: mongoose.Schema.ObjectId,
      ref: "Area",
      required: [true, "Area ID is required"],
    },

    propertyType: {
      type: String,
      required: [true, "Property Type is required"],
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
      required: [true, "Property For (Buy/Rent) is required"],
      enum: ["Buy", "Rent"], // This determines the structure of 'pricing'
    },

    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    propertySize: {
      type: Number,
      required: [true, "Property Size is required"],
    }, // In sq ft
    propertySizeInYard: {
      type: Number,
      required: [true, "Property Size in Yards is required"],
    }, // In sq yard

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
      currentOwner: {
        type: String,
        required: [true, "Current Owner Name is required"],
      },
      previousOwner: String,
      khasraNumber: String, // Can be number or string
      currentOwnerPhoneNumber: {
        type: Number,
        required: [true, "Owner Phone Number is required"],
      },
      khatauniPdf: String, // URL to the uploaded PDF
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
      address: {
        type: String,
        required: [true, "Full Address is required"],
      },
      furnishing: String, // Mostly for Rent
      avalabeFor: String, // Mostly for Rent
      availability: String, // Mostly for Rent
      whyConsider: String, // Mostly for Rent
      features: String, // Mostly for Rent
      society: String, // Mostly for Rent
    },

    locationOnMap: {
      latitude: {
        type: Number,
        required: [true, "Location Coordinates (Latitude) are required"],
      },
      longitude: {
        type: Number,
        required: [true, "Location Coordinates (Longitude) are required"],
      },
    },

    nearbyAmenities: [
      {
        name: { type: String, required: true },
        icon: { type: String }, // Icon name from Remix Icon or similar
        description: { type: String },
        location: {
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true },
        },
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

import { validatePropertyPricing } from "../middlewares/propertyValidation.middleware.js";

// --- Unit Conversion Middleware (Pre-Validate Hook) ---
propertySchema.pre("validate", function (next) {
  if (this.propertySize && !this.propertySizeInYard) {
    // 1 sq yard = 9 sq feet
    this.propertySizeInYard = parseFloat((this.propertySize / 9).toFixed(2));
  }
  next();
});

// --- Pricing Calculation Middleware (Pre-Save Hook) ---
propertySchema.pre("save", function (next) {
  // Only run for 'Buy' properties with pricing data
  if (this.propertyFor === "Buy" && this.pricing) {
    const p = this.pricing;

    // Check if relevant fields are modified (optional optimization, but good practice)
    // For nested objects, we can check if 'pricing' is modified or just recalculate always on save
    // Recalculating is safer to ensure consistency.

    // 1. Calculate Stamp Duty
    if (p.askingPrice && p.stampDutyPercentage) {
      p.stampDutyCost = (p.askingPrice * p.stampDutyPercentage) / 100;
    }

    // 2. Calculate Broker Commission
    if (p.askingPrice && p.brokerCommissionPercentage) {
      p.brokerCommissionCost =
        (p.askingPrice * p.brokerCommissionPercentage) / 100;
    }

    // 3. Calculate Final Pricing
    const asking = p.askingPrice || 0;
    const stamp = p.stampDutyCost || 0;
    const advocate = p.advocateFee || 0;
    const receipt = p.receiptFee || 0;
    const broker = p.brokerCommissionCost || 0;

    p.finelPricing = asking + stamp + advocate + receipt + broker;
  }
  next();
});

// --- Validation Middleware (Pre-Save Hook) ---
propertySchema.pre("save", validatePropertyPricing);

export const Property = mongoose.model("Property", propertySchema);
