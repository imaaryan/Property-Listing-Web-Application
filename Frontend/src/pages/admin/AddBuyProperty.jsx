import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import {
  RiArrowLeftLine,
  RiSaveLine,
  RiDeleteBinLine,
  RiAddLine,
} from "@remixicon/react";
import { toast } from "react-toastify";

// New Components
import FormSection from "../../components/admin/property/FormSection";
import FormInput from "../../components/admin/property/FormInput";
import FormSelect from "../../components/admin/property/FormSelect";
import FormTextarea from "../../components/admin/property/FormTextarea";
import ImageUpload from "../../components/admin/property/ImageUpload";
import IconSelector from "../../components/admin/property/IconSelector";

const AddBuyProperty = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID for Edit Mode

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // File States
  const [featuredImage, setFeaturedImage] = useState(null); // New file
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null); // URL or Blob

  const [existingGalleryImages, setExistingGalleryImages] = useState([]); // URLs from backend
  const [newGalleryImages, setNewGalleryImages] = useState([]); // New Files

  // Derived previews for UI
  const galleryPreviews = [
    ...existingGalleryImages,
    ...newGalleryImages.map((file) => URL.createObjectURL(file)),
  ];

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    propertyType: "",
    propertyFor: "Buy",
    areaId: "",
    cityId: "",
    bedrooms: "",
    bathrooms: "",
    propertySize: "",
    propertySizeInYard: "",

    pricing: {
      askingPrice: "",
      stampDutyPercentage: "",
      stampDutyCost: "",
      advocateFee: "",
      receiptFee: "",
      brokerCommissionPercentage: "",
      brokerCommissionCost: "",
      finelPricing: "",
      priceHistory: [],
    },

    khatuniDetails: {
      currentOwner: "",
      previousOwner: "",
      khasraNumber: "",
      currentOwnerPhoneNumber: "",
    },

    propertyDetails: {
      dimension: "",
      facing: "",
      widthOfFacingRoad: "",
      approvedBy: "",
      allowableConstructionStilt: "",
      ownership: "",
      landTitle: "",
      developmentStatus: "",
      lastLandTransaction: "",
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

    locationOnMap: {
      latitude: "",
      longitude: "",
    },

    nearbyAmenities: [],
    isPublished: true,
  });

  // Fetch Initial Data (Masters)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cityRes = await axios.get(`${backendUrl}/master/cities`);
        if (cityRes.data.success) setCities(cityRes.data.data);

        const typesRes = await axios.get(`${backendUrl}/master/property-types`);
        if (typesRes.data.success) setPropertyTypes(typesRes.data.data);
      } catch (error) {
        console.error("Error fetching initial data", error);
        toast.error("Failed to load form data sources");
      }
    };
    fetchInitialData();
  }, [backendUrl]);

  // Fetch Property Data for Edit Mode
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const { data } = await axios.get(
            `${backendUrl}/properties/get/${id}`
          );
          if (data.success) {
            const prop = data.data;

            // Populate Form Data
            setFormData({
              title: prop.title || "",
              shortDescription: prop.shortDescription || "",
              propertyType: prop.propertyType || "",
              propertyFor: "Buy",
              areaId: prop.areaId?._id || prop.areaId || "", // Handle populated or raw ID
              cityId: prop.areaId?.city?._id || "", // Assuming backend populates deeply
              bedrooms: prop.bedrooms || "",
              bathrooms: prop.bathrooms || "",
              propertySize: prop.propertySize || "",
              propertySizeInYard: prop.propertySizeInYard || "",
              pricing: prop.pricing || {
                askingPrice: "",
                stampDutyPercentage: "",
                stampDutyCost: "",
                advocateFee: "",
                receiptFee: "",
                brokerCommissionPercentage: "",
                brokerCommissionCost: "",
                finelPricing: "",
                priceHistory: [],
              },
              khatuniDetails: prop.khatuniDetails || {
                currentOwner: "",
                previousOwner: "",
                khasraNumber: "",
                currentOwnerPhoneNumber: "",
              },
              propertyDetails: {
                ...prop.propertyDetails,
                // Convert booleans back to "Yes"/"No" strings if necessary for Select inputs
                underMDDA: prop.propertyDetails?.underMDDA ? "Yes" : "No",
                underNagarNigam: prop.propertyDetails?.underNagarNigam
                  ? "Yes"
                  : "No",
                waterSupply: prop.propertyDetails?.waterSupply ? "Yes" : "No",
                powerSupply: prop.propertyDetails?.powerSupply ? "Yes" : "No",
                loanAvailable: prop.propertyDetails?.loanAvailable
                  ? "Yes"
                  : "No",
              },
              locationOnMap: prop.locationOnMap || {
                latitude: "",
                longitude: "",
              },
              nearbyAmenities: prop.nearbyAmenities || [],
              isPublished: prop.isPublished,
            });

            // Handle Images
            if (prop.images?.featuredImage) {
              setFeaturedImagePreview(prop.images.featuredImage);
            }
            if (prop.images?.imageGallery) {
              setExistingGalleryImages(prop.images.imageGallery);
            }
          }
        } catch (error) {
          console.error("Error fetching property:", error);
          toast.error("Failed to load property details");
        }
      };
      fetchProperty();
    }
  }, [id, backendUrl]);

  // Fetch Areas (dependent on cityId)
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

  // Calculations
  useEffect(() => {
    if (formData.propertySize) {
      const yards = (parseFloat(formData.propertySize) / 9).toFixed(2);
      setFormData((prev) => ({ ...prev, propertySizeInYard: yards }));
    }

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

  // History Handlers
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
      setNewGalleryImages((prev) => [...prev, ...files]);
    }
  };

  const removeGalleryImage = (index) => {
    if (index < existingGalleryImages.length) {
      // Remove from existing
      setExistingGalleryImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new
      const newIndex = index - existingGalleryImages.length;
      setNewGalleryImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // Nearby Amenities Handlers
  const addNearbyAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      nearbyAmenities: [
        ...prev.nearbyAmenities,
        {
          id: Date.now(),
          name: "",
          icon: "",
          description: "",
          location: { latitude: "", longitude: "" },
        },
      ],
    }));
  };

  const removeNearbyAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearbyAmenities: prev.nearbyAmenities.filter((_, i) => i !== index),
    }));
  };

  const updateNearbyAmenity = (index, field, value) => {
    setFormData((prev) => {
      const newAmenities = [...prev.nearbyAmenities];
      if (field === "latitude" || field === "longitude") {
        newAmenities[index].location[field] = value;
      } else {
        newAmenities[index][field] = value;
      }
      return { ...prev, nearbyAmenities: newAmenities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
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
      submitData.append(
        "nearbyAmenities",
        JSON.stringify(formData.nearbyAmenities)
      );

      // Sending existing images for backend to preserve
      submitData.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryImages)
      );

      if (featuredImage) {
        submitData.append("featuredImage", featuredImage);
      } else if (!id) {
        // Require image only for Create mode
        setLoading(false);
        return toast.error("Featured image is required");
      }

      newGalleryImages.forEach((file) => {
        submitData.append("imageGallery", file);
      });

      let res;
      if (id) {
        // Edit Mode
        res = await axios.put(
          `${backendUrl}/properties/update/${id}`,
          submitData,
          {
            headers: {
              Authorization: localStorage.getItem("adminToken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Add Mode
        res = await axios.post(`${backendUrl}/properties/add`, submitData, {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res.data.success) {
        toast.success(id ? "Property updated!" : "Property added!");
        navigate("/admin/buy-listings");
      }
    } catch (error) {
      console.error("Error saving property", error);
      toast.error(error.response?.data?.message || "Failed to save property");
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
              {id ? "Edit Property" : "Add Property to Sale"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details to list a new property
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
          <FormSection title="Basic Information">
            <FormInput
              label="Property Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Luxury Apartment in Dehradun"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <FormSelect
                label="Select City"
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                options={cities.map((c) => ({ value: c._id, label: c.name }))}
                required
              />
              <FormSelect
                label="Select Area"
                name="areaId"
                value={formData.areaId}
                onChange={handleChange}
                options={areas.map((a) => ({ value: a._id, label: a.name }))}
                disabled={!formData.cityId}
                required
              />
              <FormSelect
                label="Property Type"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                options={propertyTypes}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <FormInput
                label="Bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g. 3"
                type="number"
              />
              <FormInput
                label="Bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g. 2"
                type="number"
              />
              <FormInput
                label="Size (sq.ft)"
                name="propertySize"
                value={formData.propertySize}
                onChange={handleChange}
                placeholder="e.g. 1500"
                type="number"
                required
                helperText={
                  formData.propertySizeInYard
                    ? `Approx. ${formData.propertySizeInYard} Sq. Yards`
                    : ""
                }
              />
            </div>

            <div className="mt-6">
              <FormTextarea
                label="Description"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Detailed description of the property..."
                required
              />
            </div>
          </FormSection>

          {/* 2. Pricing Details */}
          <FormSection title="Pricing Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FormInput
                label="Asking Price (₹)"
                name="askingPrice"
                value={formData.pricing.askingPrice}
                onChange={handlePricingChange}
                placeholder="0.00"
                type="number"
              />
              <FormInput
                label="Stamp Duty (%)"
                name="stampDutyPercentage"
                value={formData.pricing.stampDutyPercentage}
                onChange={handlePricingChange}
                placeholder="0"
                type="number"
              />
              <FormInput
                label="Advocate Fees (₹)"
                name="advocateFee"
                value={formData.pricing.advocateFee}
                onChange={handlePricingChange}
                placeholder="0.00"
                type="number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FormInput
                label="Receipt Fees (₹)"
                name="receiptFee"
                value={formData.pricing.receiptFee}
                onChange={handlePricingChange}
                placeholder="0.00"
                type="number"
              />
              <FormInput
                label="Brokerage (%)"
                name="brokerCommissionPercentage"
                value={formData.pricing.brokerCommissionPercentage}
                onChange={handlePricingChange}
                placeholder="e.g. 1%"
                type="number"
              />
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-700 mb-1">
                  Final Est. Price
                </label>
                <div className="w-full h-12 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center font-bold text-lg text-primary">
                  ₹{" "}
                  {formData.pricing.finelPricing
                    ? formData.pricing.finelPricing.toLocaleString("en-IN")
                    : "0"}
                </div>
              </div>
            </div>

            {/* Price History Table */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-gray-800">
                  Price History
                </h4>
                <button
                  onClick={addHistoryRow}
                  type="button"
                  className="btn btn-xs btn-ghost text-primary"
                >
                  <RiAddLine size={16} /> Add Year
                </button>
              </div>
              {formData.pricing.priceHistory.map((row, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Year (e.g. 2021)"
                    value={row.year}
                    onChange={(e) =>
                      handleHistoryChange(index, "year", e.target.value)
                    }
                    className="input input-sm input-bordered w-32"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={row.cost}
                    onChange={(e) =>
                      handleHistoryChange(index, "cost", e.target.value)
                    }
                    className="input input-sm input-bordered flex-1"
                  />
                  <button
                    onClick={() => removeHistoryRow(index)}
                    className="text-red-400 hover:text-red-600"
                    type="button"
                  >
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              ))}
            </div>
          </FormSection>

          {/* 3. Property Details */}
          <FormSection title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex gap-4">
                <FormInput
                  label="Dimension (L)"
                  name="dimension"
                  value={formData.propertyDetails.dimension}
                  onChange={handlePropertyDetailsChange}
                  placeholder="Length"
                />
                <FormInput
                  label="Width (Optional)"
                  name="dimensionWidth" // Not in schema, assuming just textual entry or placeholder
                  value=""
                  onChange={() => {}}
                  disabled
                  placeholder="Width"
                  className="hidden" // Hiding as schema likely uses one string
                />
              </div>
              <FormSelect
                label="Facing"
                name="facing"
                value={formData.propertyDetails.facing}
                onChange={handlePropertyDetailsChange}
                options={[
                  "North",
                  "South",
                  "East",
                  "West",
                  "North-East",
                  "North-West",
                  "South-East",
                  "South-West",
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Road Width"
                name="widthOfFacingRoad"
                value={formData.propertyDetails.widthOfFacingRoad}
                onChange={handlePropertyDetailsChange}
                placeholder="e.g. 30ft"
              />
              <FormInput
                label="Approved By"
                name="approvedBy"
                value={formData.propertyDetails.approvedBy}
                onChange={handlePropertyDetailsChange}
                placeholder="Nagar Nigam"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormInput
                label="Allowable Construction Stilt"
                name="allowableConstructionStilt"
                value={formData.propertyDetails.allowableConstructionStilt}
                onChange={handlePropertyDetailsChange}
                placeholder="e.g. +2 Floors"
              />
              <FormSelect
                label="Ownership"
                name="ownership"
                value={formData.propertyDetails.ownership}
                onChange={handlePropertyDetailsChange}
                options={[
                  "Freehold",
                  "Leasehold",
                  "Power of Attorney",
                  "Co-operative Society",
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FormInput
                label="Land Title"
                name="landTitle"
                value={formData.propertyDetails.landTitle}
                onChange={handlePropertyDetailsChange}
                placeholder="e.g. Clear"
              />
              <FormInput
                label="Development Status"
                name="developmentStatus"
                value={formData.propertyDetails.developmentStatus}
                onChange={handlePropertyDetailsChange}
                placeholder="e.g. Under Construction"
              />
              <FormInput
                label="Last Transaction Date"
                name="lastLandTransaction"
                value={
                  formData.propertyDetails.lastLandTransaction
                    ? formData.propertyDetails.lastLandTransaction.split("T")[0]
                    : ""
                }
                onChange={handlePropertyDetailsChange}
                type="date"
              />
            </div>

            {/* Utilities Toggle Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <FormSelect
                label="Under MDDA?"
                name="underMDDA"
                value={formData.propertyDetails.underMDDA}
                onChange={handlePropertyDetailsChange}
                options={["Yes", "No"]}
              />
              <FormSelect
                label="Nagar Nigam?"
                name="underNagarNigam"
                value={formData.propertyDetails.underNagarNigam}
                onChange={handlePropertyDetailsChange}
                options={["Yes", "No"]}
              />
              <FormSelect
                label="Water Supply?"
                name="waterSupply"
                value={formData.propertyDetails.waterSupply}
                onChange={handlePropertyDetailsChange}
                options={["Yes", "No"]}
              />
              <FormSelect
                label="Electricity?"
                name="powerSupply"
                value={formData.propertyDetails.powerSupply}
                onChange={handlePropertyDetailsChange}
                options={["Yes", "No"]}
              />
              <FormSelect
                label="Loan Available?"
                name="loanAvailable"
                value={formData.propertyDetails.loanAvailable}
                onChange={handlePropertyDetailsChange}
                options={["Yes", "No"]}
              />
            </div>

            <div className="mt-6">
              <FormTextarea
                label="Full Address"
                name="address"
                value={formData.propertyDetails.address}
                onChange={handlePropertyDetailsChange}
                placeholder="Complete property address..."
                required
              />
            </div>
          </FormSection>

          {/* New Section: Nearby Amenities */}
          <FormSection title="Nearby Amenities">
            <div className="space-y-6">
              {formData.nearbyAmenities.map((amenity, index) => (
                <div
                  key={amenity._id || amenity.id || index}
                  className="p-4 border rounded-lg bg-gray-50 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeNearbyAmenity(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded-full transition-colors"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormInput
                      label="Amenity Name"
                      name={`name-${index}`}
                      value={amenity.name}
                      onChange={(e) =>
                        updateNearbyAmenity(index, "name", e.target.value)
                      }
                      placeholder="e.g. City Hospital"
                    />
                    <IconSelector
                      selectedIcon={amenity.icon}
                      onSelect={(icon) =>
                        updateNearbyAmenity(index, "icon", icon)
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <FormTextarea
                      label="Description"
                      name={`desc-${index}`}
                      value={amenity.description}
                      onChange={(e) =>
                        updateNearbyAmenity(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Short description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Latitude"
                      name={`lat-${index}`}
                      value={amenity.location.latitude}
                      onChange={(e) =>
                        updateNearbyAmenity(index, "latitude", e.target.value)
                      }
                      placeholder="e.g. 30.1234"
                      type="number"
                    />
                    <FormInput
                      label="Longitude"
                      name={`lng-${index}`}
                      value={amenity.location.longitude}
                      onChange={(e) =>
                        updateNearbyAmenity(index, "longitude", e.target.value)
                      }
                      placeholder="e.g. 78.1234"
                      type="number"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addNearbyAmenity}
                className="btn btn-outline btn-primary w-full gap-2 border-dashed border-2"
              >
                <RiAddLine size={20} />
                Add Nearby Amenity
              </button>
            </div>
          </FormSection>

          {/* 5. Location Coordinates */}
          <FormSection title="Location Coordinates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Latitude"
                name="latitude"
                value={formData.locationOnMap.latitude}
                onChange={handleLocationChange}
                placeholder="e.g. 30.3165"
                type="number"
                required
              />
              <FormInput
                label="Longitude"
                name="longitude"
                value={formData.locationOnMap.longitude}
                onChange={handleLocationChange}
                placeholder="e.g. 78.0322"
                type="number"
                required
              />
            </div>
          </FormSection>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <FormSection title="Property Status" className="p-6">
            <FormSelect
              label=""
              name="isPublished"
              value={formData.isPublished.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished: e.target.value === "true",
                }))
              }
              options={[
                { value: "false", label: "Draft" },
                { value: "true", label: "Published" },
              ]}
            />
          </FormSection>

          {/* Images */}
          <ImageUpload
            label="Property Image"
            imagePreview={featuredImagePreview}
            onImageChange={handleFeaturedImage}
            required
          />

          <ImageUpload
            label="Image Gallery"
            isMultiple={true}
            onImageChange={handleGalleryImages}
            galleryPreviews={galleryPreviews}
            onRemoveGalleryImage={removeGalleryImage}
          />

          {/* Admin Details */}
          <FormSection title="Admin Details (Khatuni)" className="p-6">
            <div className="space-y-4">
              <FormInput
                label="Current Owner"
                name="currentOwner"
                value={formData.khatuniDetails.currentOwner}
                onChange={handleKhatuniChange}
                required
              />
              <FormInput
                label="Phone Number"
                name="currentOwnerPhoneNumber"
                value={formData.khatuniDetails.currentOwnerPhoneNumber}
                onChange={handleKhatuniChange}
                type="number"
                required
              />
              <FormInput
                label="Previous Owner"
                name="previousOwner"
                value={formData.khatuniDetails.previousOwner}
                onChange={handleKhatuniChange}
              />
              <FormInput
                label="Khasra Number"
                name="khasraNumber"
                value={formData.khatuniDetails.khasraNumber}
                onChange={handleKhatuniChange}
              />
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
};

export default AddBuyProperty;
