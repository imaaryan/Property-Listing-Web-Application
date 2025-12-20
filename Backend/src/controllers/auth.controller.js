import jwt from "jsonwebtoken";
import { Property } from "../models/property.model.js";
import { City } from "../models/city.model.js";
import { Area } from "../models/area.model.js";
import { Enquiry } from "../models/enquiry.model.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentails" });
    } else {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      res.status(200).json({ success: true, token });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminLogin;

export const getDashboardStats = async (req, res) => {
  try {
    const [sellProperties, rentProperties, cities, areas, enquiries] =
      await Promise.all([
        Property.countDocuments({ propertyFor: "Buy", isPublished: true }),
        Property.countDocuments({ propertyFor: "Rent", isPublished: true }),
        City.countDocuments({}),
        Area.countDocuments({}),
        Enquiry.countDocuments({}),
      ]);

    res.status(200).json({
      success: true,
      data: {
        sellProperties,
        rentProperties,
        cities,
        areas,
        enquiries,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
