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

const AddBuyProperty = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);

  // File States
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Form State matching backend schema
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    propertyType: "Residential Apartment",
    propertyFor: "Buy",
    areaId: "",
    cityId: "", // Helper for filtering areas
    bedrooms: "",
    bathrooms: "",
    propertySize: "", // sq ft
    propertySizeInYard: "", // Auto-calc

    // Pricing
    pricing: {
      askingPrice: "",
      stampDutyPercentage: "5", // Default 5%
      stampDutyCost: "",
      advocateFee: "15000", // Default
      receiptFee: "25000", // Default
      brokerCommissionPercentage: "1", // Default 1%
      brokerCommissionCost: "",
      finelPricing: "", // Auto-calc
      priceHistory: [{ year: new Date().getFullYear(), cost: "" }],
    },

    // Khatuni
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
      approvedBy: "MDDA",
      allowableConstructionStilt: "+2 Floors",
      ownership: "Free Hold",
      landTitle: "Clear",
      developmentStatus: "Broad Road",
      lastLandTransaction: "", // Date
      underMDDA: "Yes",
      underNagarNigam: "Yes",
      waterSupply: "Yes",
      powerSupply: "Yes",
      loanAvailable: "Yes",
      address: "",
    },

    locationOnMap: {
      latitude: "",
      longitude: "",
    },

    amenitiesId: [], // Array of IDs
    isPublished: true,
  });

  // Fetch Cities and Amenities on Mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Cities
        const cityRes = await axios.get(
          `${backendUrl}/location/get-all-cities`
        );
        if (cityRes.data.success) setCities(cityRes.data.data);

        // Fetch Amenities (Assuming endpoint exists, else fallback to static or empty)
        try {
          const amenityRes = await axios.get(`${backendUrl}/amenities/get-all`);
          if (amenityRes.data.success) setAmenitiesList(amenityRes.data.data);
        } catch (err) {
          console.log("Amenities endpoint might not exist yet", err);
          // Fallback or empty
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
            `${backendUrl}/location/get-all-areas?cityId=${formData.cityId}`
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

  // Auto-Validation / Calculations
  useEffect(() => {
    // 1. Sq Ft to Sq Yard
    if (formData.propertySize) {
      const yards = (parseFloat(formData.propertySize) / 9).toFixed(2);
      setFormData((prev) => ({ ...prev, propertySizeInYard: yards }));
    }

    // 2. Pricing Calculations
    const p = formData.pricing;
    const asking = parseFloat(p.askingPrice) || 0;
    const stampPerc = parseFloat(p.stampDutyPercentage) || 0;
    const brokerPerc = parseFloat(p.brokerCommissionPercentage) || 0;
    const advocate = parseFloat(p.advocateFee) || 0;
    const receipt = parseFloat(p.receiptFee) || 0;

    const stampCost = (asking * stampPerc) / 100;
    const brokerCost = (asking * brokerPerc) / 100;
    const extraCosts = stampCost + brokerCost + advocate + receipt;
    const total = asking + extraCosts;

    // Only update if values actually changed to prevent loops
    if (
      p.stampDutyCost !== stampCost ||
      p.brokerCommissionCost !== brokerCost ||
      p.finelPricing !== total
    ) {
      setFormData((prev) => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          stampDutyCost: stampCost,
          brokerCommissionCost: brokerCost,
          finelPricing: total,
        },
      }));
    }
  }, [
    formData.propertySize,
    formData.pricing.askingPrice,
    formData.pricing.stampDutyPercentage,
    formData.pricing.brokerCommissionPercentage,
    formData.pricing.advocateFee,
    formData.pricing.receiptFee,
  ]);

  // Handlers
  const handleChange = (e, section = null, subSection = null) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? (checked ? "Yes" : "No") : value; // Mapping boolean to Yes/No strings for UI consistency if needed, but model might want boolean.
    // Wait, model has Boolean for some fields like underMDDA.
    // Let's check model: underMDDA: Boolean.
    // UI Design has "Yes" / "No" dropdowns or toggles?
    // Design screenshot shows dropdowns "Yes". So 'value' will be "Yes" or "No".
    // We need to convert "Yes"/"No" to true/false for backend if model expects Boolean.
    // For now, let's keep it as string in state and convert on submit.

    if (section) {
      if (subSection) {
        // Deep nested? Pricing History is array, handle separately
      } else {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [name]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePricingChange = (e) => {
    handleChange(e, "pricing");
  };

  const handlePropertyDetailsChange = (e) => {
    // For selects that map to boolean in backend
    const booleanFields = [
      "underMDDA",
      "underNagarNigam",
      "waterSupply",
      "powerSupply",
      "loanAvailable",
    ];
    if (booleanFields.includes(e.target.name)) {
      // Backend expects Boolean, but input is Yes/No string. We store string in state for UI, convert later.
      // Actually, let's just use handleChange(e, 'propertyDetails') and handle conversion on submit.
    }
    handleChange(e, "propertyDetails");
  };

  const handleKhatuniChange = (e) => handleChange(e, "khatuniDetails");

  const handleLocationChange = (e) => handleChange(e, "locationOnMap");

  // Pricing History Handlers
  const handleHistoryChange = (index, field, value) => {
    const newHistory = [...formData.pricing.priceHistory];
    newHistory[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, priceHistory: newHistory },
    }));
  };

  const addHistoryRow = () => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        priceHistory: [...prev.pricing.priceHistory, { year: "", cost: "" }],
      },
    }));
  };

  const removeHistoryRow = (index) => {
    const newHistory = formData.pricing.priceHistory.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, priceHistory: newHistory },
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // 1. Basic Fields
      submitData.append("title", formData.title);
      submitData.append("shortDescription", formData.shortDescription);
      submitData.append("propertyType", formData.propertyType);
      submitData.append("propertyFor", "Buy");
      submitData.append("areaId", formData.areaId);
      submitData.append("bedrooms", formData.bedrooms);
      submitData.append("bathrooms", formData.bathrooms);
      submitData.append("propertySize", formData.propertySize);
      submitData.append("propertySizeInYard", formData.propertySizeInYard);
      submitData.append("isPublished", formData.isPublished);

      // 2. Complex Objects (Stringify)
      submitData.append("pricing", JSON.stringify(formData.pricing));

      // Convert Yes/No to Boolean for Property Details
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
        toast.success("Property added successfully!");
        navigate("/admin/buy-listings");
      }
    } catch (error) {
      console.error("Error adding property", error);
      toast.error(error.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <RiArrowLeftLine size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            Add Property to Sale
          </h2>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary text-white gap-2"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <RiSaveLine size={20} />
          )}
          Save
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="form-control w-full mb-4">
              <label className="label font-semibold text-gray-700">
                Property Name
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Select City
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Select Area
                </label>
                <select
                  name="areaId"
                  value={formData.areaId}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  disabled={!formData.cityId}
                >
                  <option value="">Select</option>
                  {areas.map((area) => (
                    <option key={area._id} value={area._id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {[
                    "Residential Plot",
                    "Independent House",
                    "Commercial Shop",
                    "Residential Apartment",
                    "Independent Floor",
                    "Commercial Office Space",
                    "Villa",
                    "Agricultural Land",
                    "Guesthouse",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Size (in sq.f)
                </label>
                <input
                  type="number"
                  name="propertySize"
                  value={formData.propertySize}
                  onChange={handleChange}
                  placeholder="235"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-gray-700">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Write Short Description"
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>
          </div>

          {/* 2. Pricing Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Pricing Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Asking Price (in ₹)
                </label>
                <input
                  type="number"
                  name="askingPrice"
                  value={formData.pricing.askingPrice}
                  onChange={handlePricingChange}
                  placeholder="7700000"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Stamp mDuty (in %)
                </label>
                <input
                  type="number"
                  name="stampDutyPercentage"
                  value={formData.pricing.stampDutyPercentage}
                  onChange={handlePricingChange}
                  placeholder="5"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Advocate Fees (in ₹)
                </label>
                <input
                  type="number"
                  name="advocateFee"
                  value={formData.pricing.advocateFee}
                  onChange={handlePricingChange}
                  placeholder="15000"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Receipt from Registry Office
                </label>
                <input
                  type="number"
                  name="receiptFee"
                  value={formData.pricing.receiptFee}
                  onChange={handlePricingChange}
                  placeholder="25000"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Broker Commission (in %)
                </label>
                <input
                  type="number"
                  name="brokerCommissionPercentage"
                  value={formData.pricing.brokerCommissionPercentage}
                  onChange={handlePricingChange}
                  placeholder="1"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full bg-blue-50 p-3 rounded-lg border border-blue-100">
                <label className="label font-semibold text-blue-800 p-0 mb-1">
                  Total Estimated Cost:
                </label>
                <div className="text-xl font-bold text-blue-600">
                  ₹{formData.pricing.finelPricing.toLocaleString("en-IN") || 0}
                </div>
              </div>
            </div>

            {/* Pricing History */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h4 className="text-sm font-bold text-gray-700 mb-3">
                Pricing History
              </h4>
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="col-span-2 text-xs font-semibold text-gray-500">
                  Year
                </div>
                <div className="col-span-3 text-xs font-semibold text-gray-500">
                  Cost Per Sq. feet
                </div>
                <div className="col-span-1"></div>
              </div>
              {formData.pricing.priceHistory.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-2 mb-3 items-center"
                >
                  <input
                    type="number"
                    placeholder="2020"
                    value={item.year}
                    onChange={(e) =>
                      handleHistoryChange(index, "year", e.target.value)
                    }
                    className="input input-bordered input-sm col-span-2"
                  />
                  <input
                    type="number"
                    placeholder="32000"
                    value={item.cost}
                    onChange={(e) =>
                      handleHistoryChange(index, "cost", e.target.value)
                    }
                    className="input input-bordered input-sm col-span-3"
                  />
                  <div className="col-span-1 flex justify-center">
                    {index === formData.pricing.priceHistory.length - 1 ? (
                      <button
                        type="button"
                        onClick={addHistoryRow}
                        className="btn btn-square btn-sm btn-primary text-white"
                      >
                        <RiAddLine size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeHistoryRow(index)}
                        className="btn btn-square btn-sm btn-error text-white"
                      >
                        <RiDeleteBinLine size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Property Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Dimension
                </label>
                <input
                  type="text"
                  name="dimension"
                  value={formData.propertyDetails.dimension}
                  onChange={handlePropertyDetailsChange}
                  placeholder="20ft x 50ft"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Facing
                </label>
                <select
                  name="facing"
                  value={formData.propertyDetails.facing}
                  onChange={handlePropertyDetailsChange}
                  className="select select-bordered w-full"
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
                <label className="label font-semibold text-gray-700">
                  Width of Facing Road
                </label>
                <input
                  type="text"
                  name="widthOfFacingRoad"
                  value={formData.propertyDetails.widthOfFacingRoad}
                  onChange={handlePropertyDetailsChange}
                  placeholder="25ft"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Approved By
                </label>
                <input
                  type="text"
                  name="approvedBy"
                  value={formData.propertyDetails.approvedBy}
                  onChange={handlePropertyDetailsChange}
                  placeholder="MDDA"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Allowable Construction
                </label>
                <input
                  type="text"
                  name="allowableConstructionStilt"
                  value={formData.propertyDetails.allowableConstructionStilt}
                  onChange={handlePropertyDetailsChange}
                  placeholder="+2 Floors"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Ownership
                </label>
                <input
                  type="text"
                  name="ownership"
                  value={formData.propertyDetails.ownership}
                  onChange={handlePropertyDetailsChange}
                  placeholder="Free Hold"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Land Title
                </label>
                <input
                  type="text"
                  name="landTitle"
                  value={formData.propertyDetails.landTitle}
                  onChange={handlePropertyDetailsChange}
                  placeholder="Clear"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Development Status
                </label>
                <input
                  type="text"
                  name="developmentStatus"
                  value={formData.propertyDetails.developmentStatus}
                  onChange={handlePropertyDetailsChange}
                  placeholder="Vacant"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Last Land Transaction
                </label>
                <input
                  type="date"
                  name="lastLandTransaction"
                  value={
                    formData.propertyDetails.lastLandTransaction
                      ? new Date(formData.propertyDetails.lastLandTransaction)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handlePropertyDetailsChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Boolean Selects Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
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
                  <div key={fieldName} className="form-control w-full">
                    <label className="label font-semibold text-gray-700 text-xs">
                      {label}
                    </label>
                    <select
                      name={fieldName}
                      value={formData.propertyDetails[fieldName]}
                      onChange={handlePropertyDetailsChange}
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.propertyDetails.address}
                onChange={handlePropertyDetailsChange}
                placeholder="Full address"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 4. Amenities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
              {/* TODO: Fetch dynamic amenities */}
              {[
                "Swimming Pool",
                "Play Ground",
                "Park",
                "Community Hall",
                "Indoor Games",
                "Garden",
                "Nearby Airport",
                "Mall",
                "Club House",
                "CCTV",
              ].map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm rounded"
                  />
                  <span className="text-sm text-gray-600">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Location Map */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Location on Map
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.locationOnMap.latitude}
                  onChange={handleLocationChange}
                  placeholder="30.1234..."
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.locationOnMap.longitude}
                  onChange={handleLocationChange}
                  placeholder="78.1234..."
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <label className="label font-semibold text-gray-700 pt-0">
              Property Status
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
              className="select select-bordered w-full"
            >
              <option value={false}>Draft</option>
              <option value={true}>Published</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              Property Image
            </h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                featuredImagePreview
                  ? "border-primary bg-blue-50"
                  : "border-gray-300 hover:border-primary"
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
                className="w-full h-full flex flex-col items-center cursor-pointer"
              >
                {featuredImagePreview ? (
                  <img
                    src={featuredImagePreview}
                    alt="Preview"
                    className="h-40 object-cover rounded"
                  />
                ) : (
                  <>
                    <RiUploadCloud2Line
                      size={32}
                      className="text-blue-500 mb-2"
                    />
                    <span className="text-xs text-gray-500">
                      Upload / Drag and Drop the Image
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              Image Gallery
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {/* Add Button */}
              <div className="aspect-square bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors relative">
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryImages}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <RiAddLine size={24} className="text-blue-500" />
              </div>
              {/* Previews */}
              {galleryPreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden relative group"
                >
                  <img
                    src={src}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeGalleryImage(idx)}
                      className="text-white hover:text-red-400"
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Khatuni Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              Khatuni Details
            </h3>
            <div className="space-y-3">
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-700">
                  Current Owner Info
                </label>
                <input
                  type="text"
                  name="currentOwner"
                  value={formData.khatuniDetails.currentOwner}
                  onChange={handleKhatuniChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-700">
                  Previous Owner Info
                </label>
                <input
                  type="text"
                  name="previousOwner"
                  value={formData.khatuniDetails.previousOwner}
                  onChange={handleKhatuniChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-700">
                  Khasra Number
                </label>
                <input
                  type="text"
                  name="khasraNumber"
                  value={formData.khatuniDetails.khasraNumber}
                  onChange={handleKhatuniChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-xs text-gray-700">
                  Current Owner Number
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

export default AddBuyProperty;
