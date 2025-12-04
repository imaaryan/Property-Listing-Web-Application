import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a city name"],
      unique: true,
      trim: true,
    },
    showOnFooter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const City = mongoose.model("City", citySchema);
