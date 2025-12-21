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

export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, showOnFooter } = req.body;
    const city = await City.findByIdAndUpdate(
      id,
      { name, showOnFooter },
      { new: true }
    );
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    // Optional: Delete associated areas or handle cascade in model
    await Area.deleteMany({ city: id });
    res
      .status(200)
      .json({ success: true, message: "City deleted successfully" });
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

export const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cityId } = req.body;
    const updateData = { name };
    if (cityId) updateData.city = cityId;

    const area = await Area.findByIdAndUpdate(id, updateData, { new: true });
    if (!area) {
      return res
        .status(404)
        .json({ success: false, message: "Area not found" });
    }
    res.status(200).json({ success: true, data: area });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findByIdAndDelete(id);
    if (!area) {
      return res
        .status(404)
        .json({ success: false, message: "Area not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Area deleted successfully" });
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
export const getPropertyTypes = async (req, res) => {
  try {
    const types = [
      "Residential Plot",
      "Independent House",
      "Commercial Shop",
      "Residential Apartment",
      "Independent Floor",
      "Commercial Office Space",
      "Villa",
      "Agricultural Land",
      "Guesthouse",
    ];
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
