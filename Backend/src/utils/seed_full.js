import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import imagekit from "../utils/imagekit.js";

// Models
import { City } from "../models/city.model.js";
import { Area } from "../models/area.model.js";
import { Amenity } from "../models/amenity.model.js";
import { Property } from "../models/property.model.js";
import { Enquiry } from "../models/enquiry.model.js";

// Data
import {
  cities,
  areas,
  amenities,
  properties,
} from "../../data/master_data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const uploadLocalImage = async (filename, folder = "/properties") => {
  if (!filename) return null;
  const filePath = path.resolve(__dirname, "../../seed_assets", filename);

  if (!fs.existsSync(filePath)) {
    console.warn(`WARNING: Image file not found: ${filePath}`);
    return null; // Or throw error based on strictness
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: filename,
      folder: folder,
    });
    console.log(`Uploaded: ${filename} -> ${response.url}`);
    return response.url;
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error.message);
    return null;
  }
};

const seedFull = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // 1. CLEAN DB
    console.log("\n--- CLEANING DATABASE ---");
    await Property.deleteMany({});
    await Enquiry.deleteMany({});
    await Area.deleteMany({});
    await Amenity.deleteMany({});
    await City.deleteMany({});
    console.log("Database cleared.");

    // 2. SEED CITIES
    console.log("\n--- SEEDING CITIES ---");
    const cityMap = {}; // Name -> ID
    for (const cityData of cities) {
      const city = await City.create(cityData);
      cityMap[city.name] = city._id;
      console.log(`Created City: ${city.name}`);
    }

    // 3. SEED AREAS
    console.log("\n--- SEEDING AREAS ---");
    const areaMap = {}; // Name -> ID
    for (const areaData of areas) {
      const cityId = cityMap[areaData.cityName];
      if (!cityId) {
        console.warn(
          `Skipping Area ${areaData.name}: City '${areaData.cityName}' not found.`
        );
        continue;
      }
      const area = await Area.create({
        name: areaData.name,
        city: cityId,
      });
      areaMap[area.name] = area._id;
      console.log(`Created Area: ${area.name}`);
    }

    // 4. SEED AMENITIES
    console.log("\n--- SEEDING AMENITIES ---");
    const amenityMap = {}; // Name -> ID
    for (const amenityData of amenities) {
      const amenity = await Amenity.create(amenityData);
      amenityMap[amenity.name] = amenity._id;
      console.log(`Created Amenity: ${amenity.name}`);
    }

    // 5. SEED PROPERTIES
    console.log("\n--- SEEDING PROPERTIES ---");
    for (const propData of properties) {
      // Resolve Area
      const areaId = areaMap[propData.areaName];
      if (!areaId) {
        console.warn(
          `Skipping Property '${propData.title}': Area '${propData.areaName}' not found.`
        );
        continue;
      }

      // Resolve Amenities
      const amenitiesIds = [];
      if (propData.amenityNames && Array.isArray(propData.amenityNames)) {
        for (const name of propData.amenityNames) {
          if (amenityMap[name]) {
            amenitiesIds.push(amenityMap[name]);
          } else {
            console.warn(
              `Property '${propData.title}': Amenity '${name}' not found.`
            );
          }
        }
      }

      // Upload Images
      let featuredImageUrl = "";
      const imageGalleryUrls = [];

      if (propData.localFeatureImage) {
        const url = await uploadLocalImage(
          propData.localFeatureImage,
          "/properties/featured"
        );
        if (url) featuredImageUrl = url;
      }

      if (
        propData.localGalleryImages &&
        Array.isArray(propData.localGalleryImages)
      ) {
        for (const imgName of propData.localGalleryImages) {
          const url = await uploadLocalImage(imgName, "/properties/gallery");
          if (url) imageGalleryUrls.push(url);
        }
      }

      // Construct Property Object
      const newProperty = {
        ...propData,
        areaId: areaId,
        amenitiesId: amenitiesIds,
        images: {
          featuredImage: featuredImageUrl,
          imageGallery: imageGalleryUrls,
        },
      };

      // Cleanup helper fields not in schema
      delete newProperty.localFeatureImage;
      delete newProperty.localGalleryImages;
      delete newProperty.areaName;
      delete newProperty.amenityNames;

      await Property.create(newProperty);
      console.log(`Created Property: ${propData.title}`);
    }

    console.log("\n--- SEEDING COMPLETE ---");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedFull();
