import mongoose from "mongoose";

const buySchema = new mongoose.Schema(
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
      enum: [
        "Residential Plot",
        "Residential Apartment",
        "Independent House",
        "Commercial Plot",
        "Commercial Shop",
        "Commercial Apartment",
        "Warehouse / Godown",
      ],
    },
    propertyFor: {
      type: String,
      enum: ["Rent", "Buy"],
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
      askingPrice: { type: Number, required: true },
      stampDuty: { type: Number },
      advocateFee: { type: Number },
      receiptFee: { type: Number },
      brokerCommission: { type: Number },
      priceHistory: [
        {
          year: { type: Number },
          cost: { type: Number },
        },
      ],
    },
    khatuniDetails: {
      currentOwner: { type: String },
      previousOwner: { type: String },
      khasraNumber: { type: Number },
      currentOwnerPhoneNumber: { type: Number },
    },
    propertyDetails: {
      dimension: { type: String },
      facing: { type: String },
      widthOfFacingRoad: { type: String },
      approvedBy: { type: String },
      allowableConstructionStilt: { type: String },
      ownership: { type: String },
      landTitle: { type: String },
      developmentStatus: { type: String },
      lastLandTransaction: { type: Date },
      underMDDA: { type: Boolean, default: false },
      underNagarNigam: { type: Boolean, default: false },
      waterSupply: { type: Boolean, default: false },
      powerSupply: { type: Boolean, default: false },
      loanAvailable: { type: Boolean, default: false },
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

const Buy = mongoose.model("Buy", buySchema);

export default Buy;
