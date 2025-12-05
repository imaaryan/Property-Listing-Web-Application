import { City } from "../models/city.model.js";
import { Area } from "../models/area.model.js";
import { Amenity } from "../models/amenity.model.js";

// --- City Controllers ---
export const addCity = async (req, res) => {
  try {
    const { name, showOnFooter } = req.body;
    const city = await City.create({ name, showOnFooter });
    res.status(201).json({ success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await City.find({});
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Area Controllers ---
export const addArea = async (req, res) => {
  try {
    const { name, cityId } = req.body;
    const area = await Area.create({ name, city: cityId });
    res.status(201).json({ success: true, data: area });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAreas = async (req, res) => {
  try {
    const { cityId } = req.query;
    const query = cityId ? { city: cityId } : {};
    const areas = await Area.find(query).populate("city");
    res.status(200).json({ success: true, data: areas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Amenity Controllers ---
export const addAmenity = async (req, res) => {
  try {
    const { name } = req.body;
    const amenity = await Amenity.create({ name });
    res.status(201).json({ success: true, data: amenity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({});
    res.status(200).json({ success: true, data: amenities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
