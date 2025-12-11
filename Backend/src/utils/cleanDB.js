import mongoose from "mongoose";
import dotenv from "dotenv";
import { Property } from "../models/property.model.js";
import { Amenity } from "../models/amenity.model.js";
import { Area } from "../models/area.model.js";
import { City } from "../models/city.model.js";
import { Enquiry } from "../models/enquiry.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const cleanDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Warning prompt could be good here, but for a script we assume user knows what they are doing.

    console.log("Deleting all Properties...");
    const propResult = await Property.deleteMany({});
    console.log(`Deleted ${propResult.deletedCount} properties.`);

    console.log("Deleting all Enquiries...");
    const enqResult = await Enquiry.deleteMany({});
    console.log(`Deleted ${enqResult.deletedCount} enquiries.`);

    console.log("Deleting all Amenities...");
    const amenityResult = await Amenity.deleteMany({});
    console.log(`Deleted ${amenityResult.deletedCount} amenities.`);

    console.log("Deleting all Areas...");
    const areaResult = await Area.deleteMany({});
    console.log(`Deleted ${areaResult.deletedCount} areas.`);

    console.log("Deleting all Cities...");
    const cityResult = await City.deleteMany({});
    console.log(`Deleted ${cityResult.deletedCount} cities.`);

    console.log("\nFULL DATABASE RESET COMPLETE.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

cleanDB();
