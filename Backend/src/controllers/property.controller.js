import { Property } from "../models/property.model.js";
import imagekit from "../utils/imagekit.js";

// Helper to upload file to ImageKit
const uploadToImageKit = async (file, folder) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer, // Multer stores file in memory as buffer
      fileName: file.originalname,
      folder: folder,
    });
    return response.url;
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

export const createProperty = async (req, res) => {
  try {
    // 1. Handle Images
    let featuredImageUrl = "";
    const imageGalleryUrls = [];

    // Upload Featured Image
    if (req.files?.featuredImage?.[0]) {
      featuredImageUrl = await uploadToImageKit(
        req.files.featuredImage[0],
        "/properties/featured"
      );
    }

    // Upload Gallery Images
    if (req.files?.imageGallery) {
      for (const file of req.files.imageGallery) {
        const url = await uploadToImageKit(file, "/properties/gallery");
        imageGalleryUrls.push(url);
      }
    }

    // 2. Prepare Data
    // req.body contains the text fields from the multipart/form-data
    const propertyData = {
      ...req.body,
      images: {
        featuredImage: featuredImageUrl,
        imageGallery: imageGalleryUrls,
      },
      // Ensure nested objects are parsed correctly if sent as JSON strings
      // (Frontend might send nested objects like 'pricing' as stringified JSON)
      pricing:
        typeof req.body.pricing === "string"
          ? JSON.parse(req.body.pricing)
          : req.body.pricing,
      propertyDetails:
        typeof req.body.propertyDetails === "string"
          ? JSON.parse(req.body.propertyDetails)
          : req.body.propertyDetails,
      khatuniDetails:
        typeof req.body.khatuniDetails === "string"
          ? JSON.parse(req.body.khatuniDetails)
          : req.body.khatuniDetails,
      locationOnMap:
        typeof req.body.locationOnMap === "string"
          ? JSON.parse(req.body.locationOnMap)
          : req.body.locationOnMap,
      amenitiesId:
        typeof req.body.amenitiesId === "string"
          ? JSON.parse(req.body.amenitiesId)
          : req.body.amenitiesId,
    };

    // 3. Create Property
    const property = await Property.create(propertyData);

    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({})
      .populate("areaId")
      .populate("amenitiesId");
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id)
      .populate({
        path: "areaId",
        populate: { path: "city" }, // Populate City inside Area
      })
      .populate("amenitiesId");

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
