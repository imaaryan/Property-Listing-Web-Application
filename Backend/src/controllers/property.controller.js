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
    const {
      page = 1,
      limit = 10,
      city, // City ID
      area, // Area ID
      type, // Property Type
      propertyFor, // Buy or Rent
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      showAll, // New param to show drafts
    } = req.query;

    const query = {};

    // 0. Default: Only show published properties unless showAll is true
    if (showAll !== "true") {
      query.isPublished = true;
    }

    // 1. Search by Title
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // 2. Filter by Property For (Buy/Rent)
    if (propertyFor) {
      query.propertyFor = propertyFor;
    }

    // 3. Filter by Property Type
    if (type) {
      query.propertyType = type;
    }

    // 4. Filter by Area (Direct Match)
    if (area) {
      query.areaId = area;
    }

    // 5. Filter by City
    // Since Property has 'areaId' which refs 'Area', and 'Area' refs 'City',
    // filtering by City is complex in a single query without aggregation.
    // However, if the frontend sends 'areaId', we don't need city.
    // If frontend sends ONLY 'cityId', we first find all areas in that city.
    if (city && !area) {
      // Find all areas in this city
      // We need to import Area model to do this, or use aggregation.
      // Let's use aggregation for better performance if needed, but simple find is easier here.
      // Dynamic import to avoid circular dependency issues if any (though unlikely here)
      const { Area } = await import("../models/area.model.js");
      const areasInCity = await Area.find({ city: city }).select("_id");
      const areaIds = areasInCity.map((a) => a._id);
      query.areaId = { $in: areaIds };
    }

    // 6. Filter by Price
    if (minPrice || maxPrice) {
      const priceQuery = {};
      if (minPrice) priceQuery.$gte = Number(minPrice);
      if (maxPrice) priceQuery.$lte = Number(maxPrice);

      if (propertyFor === "Buy") {
        query["pricing.finelPricing"] = priceQuery;
      } else if (propertyFor === "Rent") {
        query["pricing.rentPerMonth"] = priceQuery;
      } else {
        // If propertyFor is not specified, check both (OR condition)
        query.$or = [
          { "pricing.finelPricing": priceQuery },
          { "pricing.rentPerMonth": priceQuery },
        ];
      }
    }

    // 7. Filter by Property Area Size (Sq ft)
    if (minArea || maxArea) {
      const areaSizeQuery = {};
      if (minArea) areaSizeQuery.$gte = Number(minArea);
      if (maxArea) areaSizeQuery.$lte = Number(maxArea);
      query.propertySize = areaSizeQuery;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(query)
      .populate({
        path: "areaId",
        populate: { path: "city" },
      })
      .populate("amenitiesId")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); // Newest first

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Aggregation Stats Endpoint ---
export const getStats = async (req, res) => {
  try {
    const { city, area, type } = req.query;

    const matchStage = { isPublished: true }; // Only stats for published properties

    // 1. Filter by Property Type
    if (type && type !== "All") {
      matchStage.propertyType = type;
    }

    // 2. Filter by Area (Direct Match) or City
    if (area) {
      // If we have area ID, we can match directly if we cast it to ObjectId
      // But aggregate needs ObjectId, so we import mongoose
      const mongoose = await import("mongoose");
      matchStage.areaId = new mongoose.default.Types.ObjectId(area);
    } else if (city) {
      // If only city, we need to find all areas in that city first
      // OR we can lookup areaId and filter.
      // Easiest is to fetch area IDs first like in getAllProperties
      const { Area } = await import("../models/area.model.js");
      const areasInCity = await Area.find({ city: city }).select("_id");
      const areaIds = areasInCity.map((a) => a._id);
      matchStage.areaId = { $in: areaIds };
    }

    const stats = await Property.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          minPriceBuy: { $min: "$pricing.finelPricing" },
          maxPriceBuy: { $max: "$pricing.finelPricing" },
          minPriceRent: { $min: "$pricing.rentPerMonth" },
          maxPriceRent: { $max: "$pricing.rentPerMonth" },
          minArea: { $min: "$propertySize" },
          maxArea: { $max: "$propertySize" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      const result = stats[0];
      res.status(200).json({
        success: true,
        data: {
          minPriceBuy: result.minPriceBuy || 0,
          maxPriceBuy: result.maxPriceBuy || 0,
          minPriceRent: result.minPriceRent || 0,
          maxPriceRent: result.maxPriceRent || 0,
          minArea: result.minArea || 0,
          maxArea: result.maxArea || 0,
          count: result.count,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          minPriceBuy: 0,
          maxPriceBuy: 0,
          minPriceRent: 0,
          maxPriceRent: 0,
          minArea: 0,
          maxArea: 0,
          count: 0,
        },
      });
    }
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

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    let property = await Property.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // 1. Handle New Images (if any)
    let featuredImageUrl = property.images.featuredImage;
    let imageGalleryUrls = property.images.imageGallery;

    // Update Featured Image if provided
    if (req.files?.featuredImage?.[0]) {
      featuredImageUrl = await uploadToImageKit(
        req.files.featuredImage[0],
        "/properties/featured"
      );
    }

    // Append New Gallery Images if provided
    if (req.files?.imageGallery) {
      for (const file of req.files.imageGallery) {
        const url = await uploadToImageKit(file, "/properties/gallery");
        imageGalleryUrls.push(url);
      }
    }

    // 2. Prepare Update Data
    const updateData = {
      ...req.body,
      images: {
        featuredImage: featuredImageUrl,
        imageGallery: imageGalleryUrls,
      },
    };

    // Parse nested JSON strings if they exist (similar to create)
    if (req.body.pricing && typeof req.body.pricing === "string")
      updateData.pricing = JSON.parse(req.body.pricing);
    if (
      req.body.propertyDetails &&
      typeof req.body.propertyDetails === "string"
    )
      updateData.propertyDetails = JSON.parse(req.body.propertyDetails);
    if (req.body.khatuniDetails && typeof req.body.khatuniDetails === "string")
      updateData.khatuniDetails = JSON.parse(req.body.khatuniDetails);
    if (req.body.locationOnMap && typeof req.body.locationOnMap === "string")
      updateData.locationOnMap = JSON.parse(req.body.locationOnMap);
    if (req.body.amenitiesId && typeof req.body.amenitiesId === "string")
      updateData.amenitiesId = JSON.parse(req.body.amenitiesId);

    // 3. Update Property
    property = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    await property.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// --- Bulk Actions ---
export const togglePropertyStatus = async (req, res) => {
  try {
    const { ids } = req.body; // Expect array of IDs

    if (!ids || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No property IDs provided" });
    }

    // Find all properties to get their current status
    const properties = await Property.find({ _id: { $in: ids } });

    // Create bulk write operations
    const bulkOps = properties.map((prop) => ({
      updateOne: {
        filter: { _id: prop._id },
        update: { isPublished: !prop.isPublished }, // Toggle logic
      },
    }));

    if (bulkOps.length > 0) {
      await Property.bulkWrite(bulkOps);
    }

    res.status(200).json({
      success: true,
      message: "Properties status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProperties = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No IDs provided" });
    }
    await Property.deleteMany({ _id: { $in: ids } });
    res
      .status(200)
      .json({ success: true, message: "Properties deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
