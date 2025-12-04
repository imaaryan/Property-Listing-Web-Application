import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an amenity name"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Amenity = mongoose.model("Amenity", amenitySchema);
