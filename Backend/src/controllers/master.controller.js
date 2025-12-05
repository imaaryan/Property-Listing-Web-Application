import { City } from "../models/city.model.js";

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
