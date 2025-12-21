import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import {
  RiUploadCloud2Line,
  RiAddLine,
  RiDeleteBinLine,
  RiArrowLeftLine,
  RiSaveLine,
  RiImageAddLine,
} from "@remixicon/react";
import { toast } from "react-toastify";

const AddRentProperty = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // File States
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Form State matching backend schema
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    propertyType: "",
    propertyFor: "Rent",
    areaId: "",
    cityId: "",
    bedrooms: "",
    bathrooms: "",
    propertySize: "",
    propertySizeInYard: "",

    // Pricing (Rent Specific)
    pricing: {
      rentPerMonth: "",
      securityDeposit: "",
    },

    // Rent fields often don't emphasize Khatuni as much, but keeping structure if needed.
    // Keeping it empty/hidden or optional based on generic usefulness.
    khatuniDetails: {
      currentOwner: "",
      previousOwner: "",
      khasraNumber: "",
      currentOwnerPhoneNumber: "",
    },

    // Property Details
    propertyDetails: {
      dimension: "",
      facing: "",
      widthOfFacingRoad: "",
      approvedBy: "",
      allowableConstructionStilt: "",
      ownership: "",
      landTitle: "",
      developmentStatus: "",

      // Rent Specific
      furnishing: "",
      avalabeFor: "", // Family/Bachelor etc
      availability: "", // Immediately, within 15 days etc
      whyConsider: "",
      features: "",
      society: "",

      underMDDA: "No",
      underNagarNigam: "No",
      waterSupply: "No",
      powerSupply: "No",
      loanAvailable: "No",
      address: "",
    },

    locationOnMap: {
      latitude: "",
      longitude: "",
    },

    amenitiesId: [],
    isPublished: true,
  });

  // Fetch Initial Data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cityRes = await axios.get(`${backendUrl}/master/cities`);
        if (cityRes.data.success) setCities(cityRes.data.data);

        try {
          const amenityRes = await axios.get(`${backendUrl}/master/amenities`);
          if (amenityRes.data.success) setAmenitiesList(amenityRes.data.data);
        } catch (err) {
          console.log("Amenities fetch error", err);
        }

        try {
          const typesRes = await axios.get(
            `${backendUrl}/master/property-types`
          );
          if (typesRes.data.success) setPropertyTypes(typesRes.data.data);
        } catch (err) {
          console.log("Property Types fetch error", err);
        }
      } catch (error) {
        console.error("Error fetching initial data", error);
        toast.error("Failed to load form data sources");
      }
    };
    fetchInitialData();
  }, [backendUrl]);

  // Fetch Areas when City Changes
  useEffect(() => {
    if (formData.cityId) {
      const fetchAreas = async () => {
        try {
          const res = await axios.get(
            `${backendUrl}/master/areas?cityId=${formData.cityId}`
          );
          if (res.data.success) setAreas(res.data.data);
        } catch (error) {
          console.error("Error fetching areas", error);
        }
      };
      fetchAreas();
    } else {
      setAreas([]);
    }
  }, [formData.cityId, backendUrl]);

  // Sq Ft to Sq Yard
  useEffect(() => {
    if (formData.propertySize) {
      const yards = (parseFloat(formData.propertySize) / 9).toFixed(2);
      setFormData((prev) => ({ ...prev, propertySizeInYard: yards }));
    }
  }, [formData.propertySize]);

  // Handlers
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePricingChange = (e) => handleChange(e, "pricing");
  const handlePropertyDetailsChange = (e) => handleChange(e, "propertyDetails");
  const handleKhatuniChange = (e) => handleChange(e, "khatuniDetails");
  const handleLocationChange = (e) => handleChange(e, "locationOnMap");

  // Image Handlers
  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (id) => {
    setFormData((prev) => {
      const currentIds = prev.amenitiesId;
      if (currentIds.includes(id)) {
        return {
          ...prev,
          amenitiesId: currentIds.filter((item) => item !== id),
        };
      } else {
        return { ...prev, amenitiesId: [...currentIds, id] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // 1. Basic Fields
      submitData.append("title", formData.title);
      submitData.append("shortDescription", formData.shortDescription);
      submitData.append("propertyType", formData.propertyType);
      submitData.append("propertyFor", "Rent");
      submitData.append("areaId", formData.areaId);
      submitData.append("bedrooms", formData.bedrooms);
      submitData.append("bathrooms", formData.bathrooms);
      submitData.append("propertySize", formData.propertySize);
      submitData.append("propertySizeInYard", formData.propertySizeInYard);
      submitData.append("isPublished", formData.isPublished);

      // 2. Complex Objects (Stringify)
      submitData.append("pricing", JSON.stringify(formData.pricing));

      const propDetailsToSend = { ...formData.propertyDetails };
      [
        "underMDDA",
        "underNagarNigam",
        "waterSupply",
        "powerSupply",
        "loanAvailable",
      ].forEach((key) => {
        propDetailsToSend[key] = propDetailsToSend[key] === "Yes";
      });
      submitData.append("propertyDetails", JSON.stringify(propDetailsToSend));

      submitData.append(
        "khatuniDetails",
        JSON.stringify(formData.khatuniDetails)
      );
      submitData.append(
        "locationOnMap",
        JSON.stringify(formData.locationOnMap)
      );
      submitData.append("amenitiesId", JSON.stringify(formData.amenitiesId));

      // 3. Images
      if (featuredImage) {
        submitData.append("featuredImage", featuredImage);
      } else {
        return toast.error("Featured image is required");
      }

      galleryImages.forEach((file) => {
        submitData.append("imageGallery", file);
      });

      const { data } = await axios.post(
        `${backendUrl}/properties/add`,
        submitData,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Rent Property added successfully!");
        navigate("/admin/rent-listings");
      }
    } catch (error) {
      console.error("Error adding property", error);
      toast.error(error.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100"
          >
            <RiArrowLeftLine size={24} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Property for Rent
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details to list a new rental property
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary text-white gap-2 px-8 shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <RiSaveLine size={20} />
          )}
          Save Property
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Basic Information
            </h3>

            <div className="form-control w-full mb-6">
              <label className="label font-semibold text-gray-700 mb-1">
                Property Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Spacious 3BHK in Jakhan"
                className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Select City <span className="text-red-500">*</span>
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select City</option>
                  {cities?.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Select Area <span className="text-red-500">*</span>
                </label>
                <select
                  name="areaId"
                  value={formData.areaId}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                  disabled={!formData.cityId}
                >
                  <option value="">Select Area</option>
                  {areas?.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select Type</option>
                  {propertyTypes?.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Size (sq.ft) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="propertySize"
                  value={formData.propertySize}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  required
                />
                {formData.propertySizeInYard && (
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Approx.{" "}
                      <span className="font-semibold text-primary">
                        {formData.propertySizeInYard}
                      </span>{" "}
                      Sq. Yards
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Describe the property, rules, etc..."
                className="textarea textarea-bordered h-32 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-base"
                required
              ></textarea>
            </div>
          </div>

          {/* 2. Rent & Pricing Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Rent & Pricing Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Monthly Rent (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="rentPerMonth"
                  value={formData.pricing.rentPerMonth}
                  onChange={handlePricingChange}
                  placeholder="e.g. 25000"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Security Deposit (₹)
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.pricing.securityDeposit}
                  onChange={handlePricingChange}
                  placeholder="e.g. 50000"
                  className="input input-bordered w-full h-12 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. Property Details (Rent Specific) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Additional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Furnishing Status
                </label>
                <select
                  name="furnishing"
                  value={formData.propertyDetails.furnishing}
                  onChange={handlePropertyDetailsChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully-Furnished">Fully-Furnished</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Available For
                </label>
                <select
                  name="avalabeFor"
                  value={formData.propertyDetails.avalabeFor}
                  onChange={handlePropertyDetailsChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select</option>
                  <option value="All">All</option>
                  <option value="Family">Family Only</option>
                  <option value="Bachelors">Bachelors Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Boys">Boys Only</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Available From
                </label>
                <input
                  type="date"
                  name="availability"
                  value={formData.propertyDetails.availability || ""}
                  onChange={handlePropertyDetailsChange}
                  className="input input-bordered w-full h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Facing
                </label>
                <select
                  name="facing"
                  value={formData.propertyDetails.facing}
                  onChange={handlePropertyDetailsChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North-East">North-East</option>
                  <option value="North-West">North-West</option>
                  <option value="South-East">South-East</option>
                  <option value="South-West">South-West</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Society/Project
                </label>
                <input
                  type="text"
                  name="society"
                  value={formData.propertyDetails.society}
                  onChange={handlePropertyDetailsChange}
                  placeholder="e.g. Palm Heights"
                  className="input input-bordered w-full h-12"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Road Width
                </label>
                <input
                  type="text"
                  name="widthOfFacingRoad"
                  value={formData.propertyDetails.widthOfFacingRoad}
                  onChange={handlePropertyDetailsChange}
                  placeholder="e.g. 25ft"
                  className="input input-bordered w-full h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Approved By
                </label>
                <select
                  name="approvedBy"
                  value={formData.propertyDetails.approvedBy}
                  onChange={handlePropertyDetailsChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select Authority</option>
                  <option value="MDDA">MDDA</option>
                  <option value="Nagar Nigam">Nagar Nigam</option>
                  <option value="Panchayat">Panchayat</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Allowable Cons.
                </label>
                <input
                  type="text"
                  name="allowableConstructionStilt"
                  value={formData.propertyDetails.allowableConstructionStilt}
                  onChange={handlePropertyDetailsChange}
                  placeholder="e.g. +2 Floors"
                  className="input input-bordered w-full h-12"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Ownership
                </label>
                <select
                  name="ownership"
                  value={formData.propertyDetails.ownership}
                  onChange={handlePropertyDetailsChange}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                >
                  <option value="">Select Ownership</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                  <option value="Co-operative Society">
                    Co-operative Society
                  </option>
                </select>
              </div>
            </div>

            <div className="divider my-6">Utilities & Approvals</div>

            {/* Boolean Selects Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                "Under MDDA",
                "Under Nagar Nigam",
                "Water Supply",
                "Power Supply",
                "Loan Available",
              ].map((label, idx) => {
                const fieldName = [
                  "underMDDA",
                  "underNagarNigam",
                  "waterSupply",
                  "powerSupply",
                  "loanAvailable",
                ][idx];
                return (
                  <div
                    key={fieldName}
                    className="form-control w-full bg-gray-50 p-3 rounded-lg border border-gray-100"
                  >
                    <label
                      className="label font-semibold text-gray-700 text-xs mb-1 truncate"
                      title={label}
                    >
                      {label}
                    </label>
                    <select
                      name={fieldName}
                      value={formData.propertyDetails[fieldName] || "No"}
                      onChange={handlePropertyDetailsChange}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-gray-700 mb-1">
                Full Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.propertyDetails.address}
                onChange={handlePropertyDetailsChange}
                placeholder="Complete property address..."
                className="input input-bordered w-full h-12"
              />
            </div>
          </div>

          {/* 4. Amenities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {amenitiesList?.length > 0 ? (
                amenitiesList.map((amenity) => (
                  <label
                    key={amenity._id}
                    className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenitiesId.includes(amenity._id)}
                      onChange={() => handleAmenityChange(amenity._id)}
                      className="checkbox checkbox-primary checkbox-sm rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                      {amenity.name}
                    </span>
                  </label>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  No amenities found. Please add amenities in settings.
                </div>
              )}
            </div>
          </div>

          {/* 5. Location Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Location Coordinates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.locationOnMap.latitude}
                  onChange={handleLocationChange}
                  placeholder="e.g. 30.3165"
                  className="input input-bordered w-full h-12"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.locationOnMap.longitude}
                  onChange={handleLocationChange}
                  placeholder="e.g. 78.0322"
                  className="input input-bordered w-full h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="label font-bold text-gray-800 mb-2">
              Publish Status
            </label>
            <select
              name="isPublished"
              value={formData.isPublished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished: e.target.value === "true",
                }))
              }
              className={`select select-bordered w-full h-12 font-medium ${
                formData.isPublished
                  ? "text-green-600 bg-green-50 border-green-200"
                  : "text-orange-600 bg-orange-50 border-orange-200"
              }`}
            >
              <option value={false}>Draft (Hidden)</option>
              <option value={true}>Published (Live)</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Featured Image
            </h3>
            <div
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-64 ${
                featuredImagePreview
                  ? "border-primary bg-blue-50/30"
                  : "border-gray-200 hover:border-primary hover:bg-gray-50"
              }`}
            >
              <input
                type="file"
                onChange={handleFeaturedImage}
                className="hidden"
                id="featured-upload"
                accept="image/*"
              />
              <label
                htmlFor="featured-upload"
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                {featuredImagePreview ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={featuredImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3 text-primary">
                      <RiUploadCloud2Line size={32} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      SVG, PNG, JPG (Max 5MB)
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                Image Gallery
              </h3>
              <span className="text-xs text-gray-500">
                {galleryPreviews.length} images
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Add Button */}
              <div className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 hover:text-primary transition-all relative">
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryImages}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <RiImageAddLine size={24} className="mb-1" />
                <span className="text-xs font-medium">Add</span>
              </div>
              {/* Previews */}
              {galleryPreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-xl overflow-hidden relative group shadow-sm border border-gray-100"
                >
                  <img
                    src={src}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeGalleryImage(idx)}
                      className="btn btn-circle btn-xs btn-error text-white scale-90 hover:scale-100"
                    >
                      <RiDeleteBinLine size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Khatuni Details - Kept but simplified or optional for Rent */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Admin Details (Khatuni)
            </h3>
            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-500 mb-0.5">
                  Current Owner
                </label>
                <input
                  type="text"
                  name="currentOwner"
                  value={formData.khatuniDetails.currentOwner}
                  onChange={handleKhatuniChange}
                  className="input input-bordered input-sm w-full font-medium"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-500 mb-0.5">
                  Owner Phone
                </label>
                <input
                  type="number"
                  name="currentOwnerPhoneNumber"
                  value={formData.khatuniDetails.currentOwnerPhoneNumber}
                  onChange={handleKhatuniChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRentProperty;
