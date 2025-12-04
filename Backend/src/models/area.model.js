import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an area name"],
      trim: true,
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
      required: true,
    },
  },
  { timestamps: true }
);

export const Area = mongoose.model("Area", areaSchema);
