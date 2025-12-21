import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { RiArrowLeftLine, RiSaveLine } from "@remixicon/react";
import { toast } from "react-toastify";

// New Components
import FormSection from "../../components/admin/property/FormSection";
import FormInput from "../../components/admin/property/FormInput";
import FormSelect from "../../components/admin/property/FormSelect";
import FormTextarea from "../../components/admin/property/FormTextarea";
import ImageUpload from "../../components/admin/property/ImageUpload";
import AmenitiesSelector from "../../components/admin/property/AmenitiesSelector";

const AddRentProperty = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // File States
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]); // URLs
  const [newGalleryImages, setNewGalleryImages] = useState([]); // Files

  // Derived previews
  const galleryPreviews = [
    ...existingGalleryImages,
    ...newGalleryImages.map((file) => URL.createObjectURL(file)),
  ];

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
      avalabeFor: "",
      availability: "",
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

        const typeRes = await axios.get(`${backendUrl}/master/property-types`);
        if (typeRes.data.success) setPropertyTypes(typeRes.data.data);

        const amenityRes = await axios.get(`${backendUrl}/master/amenities`);
        if (amenityRes.data.success) setAmenitiesList(amenityRes.data.data);
      } catch (error) {
        console.error("Error fetching initial data", error);
        toast.error("Failed to load form data");
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
              propertyFor: "Rent",
              areaId: prop.areaId?._id || prop.areaId || "",
              cityId: prop.areaId?.city?._id || "",
              bedrooms: prop.bedrooms || "",
              bathrooms: prop.bathrooms || "",
              propertySize: prop.propertySize || "",
              propertySizeInYard: prop.propertySizeInYard || "",
              pricing: prop.pricing || {
                rentPerMonth: "",
                securityDeposit: "",
              },
              khatuniDetails: prop.khatuniDetails || {
                currentOwner: "",
                previousOwner: "",
                khasraNumber: "",
                currentOwnerPhoneNumber: "",
              },
              propertyDetails: {
                ...prop.propertyDetails,
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
              amenitiesId: prop.amenitiesId?.map((a) => a._id || a) || [],
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

  // Fetch Areas when City changes
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

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [name]: value },
    }));
  };

  const handlePropertyDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      propertyDetails: { ...prev.propertyDetails, [name]: value },
    }));
  };

  const handleKhatuniChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      khatuniDetails: { ...prev.khatuniDetails, [name]: value },
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      locationOnMap: { ...prev.locationOnMap, [name]: value },
    }));
  };

  const handleAmenityChange = (id) => {
    setFormData((prev) => {
      const isSelected = prev.amenitiesId.includes(id);
      if (isSelected) {
        return {
          ...prev,
          amenitiesId: prev.amenitiesId.filter((item) => item !== id),
        };
      } else {
        return { ...prev, amenitiesId: [...prev.amenitiesId, id] };
      }
    });
  };

  // Image Handlers
  const handleFeaturedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    } else {
      // Don't reset if we have an existing preview but no new file?
      // Actually standard behavior: if user cancels file dialog, e.target.files is empty.
      // But clearing state might be annoying if accidental.
      // Keeping original behavior safe:
      // setFeaturedImage(null);
      // setFeaturedImagePreview(null);
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
      setExistingGalleryImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingGalleryImages.length;
      setNewGalleryImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (
          key !== "pricing" &&
          key !== "propertyDetails" &&
          key !== "khatuniDetails" &&
          key !== "locationOnMap" &&
          key !== "amenitiesId"
        ) {
          data.append(key, formData[key]);
        }
      });
      data.append("pricing", JSON.stringify(formData.pricing));
      data.append("propertyDetails", JSON.stringify(formData.propertyDetails));
      data.append("khatuniDetails", JSON.stringify(formData.khatuniDetails));
      data.append("locationOnMap", JSON.stringify(formData.locationOnMap));
      data.append("amenitiesId", JSON.stringify(formData.amenitiesId));

      data.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryImages)
      );

      if (featuredImage) {
        data.append("featuredImage", featuredImage);
      } else if (!id) {
        setLoading(false);
        return toast.error("Featured image is required");
      }

      newGalleryImages.forEach((image) => {
        data.append("imageGallery", image);
      });

      let res;
      if (id) {
        res = await axios.put(`${backendUrl}/properties/update/${id}`, data, {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(`${backendUrl}/properties/add`, data, {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res.data.success) {
        toast.success(
          id ? "Property updated!" : "Rent property added successfully!"
        );
        navigate("/admin/rent-listings");
      }
    } catch (error) {
      console.error("Error adding/updating property", error);
      toast.error(error.response?.data?.message || "Error saving property");
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
            <h1 className="text-2xl font-bold text-gray-800">
              {id ? "Edit Property for Rent" : "Add Property for Rent"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Fill in the details to list a new rent property
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
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          <FormSection title="Basic Information">
            <FormInput
              label="Property Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Spacious 3BHK in Jakhan"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <FormSelect
                label="Select City"
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                options={cities?.map((city) => ({
                  value: city._id,
                  label: city.name,
                }))}
                required
              />
              <FormSelect
                label="Select Area"
                name="areaId"
                value={formData.areaId}
                onChange={handleChange}
                options={areas?.map((area) => ({
                  value: area._id,
                  label: area.name,
                }))}
                disabled={!formData.cityId}
                required
              />
              <FormSelect
                label="Property Type"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                options={propertyTypes?.map((type) => ({
                  value: type,
                  label: type,
                }))}
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
                placeholder="Describe the property, rules, etc..."
                required
              />
            </div>
          </FormSection>

          <FormSection title="Rent Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FormSelect
                label="Furnishing"
                name="furnishing"
                value={formData.propertyDetails.furnishing}
                onChange={handlePropertyDetailsChange}
                options={[
                  { value: "", label: "Select" },
                  { value: "Unfurnished", label: "Unfurnished" },
                  { value: "Semi-Furnished", label: "Semi-Furnished" },
                  { value: "Fully-Furnished", label: "Fully-Furnished" },
                ]}
              />
              <FormSelect
                label="Available For"
                name="avalabeFor"
                value={formData.propertyDetails.avalabeFor}
                onChange={handlePropertyDetailsChange}
                options={[
                  { value: "", label: "Select" },
                  { value: "All", label: "All" },
                  { value: "Family", label: "Family Only" },
                  { value: "Bachelors", label: "Bachelors Only" },
                  { value: "Girls", label: "Girls Only" },
                  { value: "Boys", label: "Boys Only" },
                ]}
              />
              <FormInput
                label="Availability"
                name="availability"
                value={formData.propertyDetails.availability || ""}
                onChange={handlePropertyDetailsChange}
                type="date"
              />
            </div>

            <div className="mb-6">
              <FormTextarea
                label="Why you should consider this property?"
                name="whyConsider"
                value={formData.propertyDetails.whyConsider}
                onChange={handlePropertyDetailsChange}
                placeholder="• Close to Metro&#10;• Park Facing&#10;• 24x7 Security"
                helperText="Use bullets"
              />
            </div>

            <div className="mb-6">
              <FormTextarea
                label="Features"
                name="features"
                value={formData.propertyDetails.features}
                onChange={handlePropertyDetailsChange}
                placeholder="• Security / Fire Alarm&#10;• Intercom Facility&#10;• Lift(s)&#10;• Water Purifier"
              />
            </div>

            <div className="">
              <FormInput
                label="Society"
                name="society"
                value={formData.propertyDetails.society}
                onChange={handlePropertyDetailsChange}
                placeholder="e.g. Assotech Windsor Park"
              />
            </div>
          </FormSection>

          <FormSection title="Amenities">
            <AmenitiesSelector
              amenitiesList={amenitiesList}
              selectedAmenities={formData.amenitiesId}
              onAmenityChange={handleAmenityChange}
            />
          </FormSection>

          <FormSection title="Location Coordinates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Latitude"
                name="latitude"
                value={formData.locationOnMap.latitude}
                onChange={handleLocationChange}
                placeholder="e.g. 30.3165"
                type="number"
              />
              <FormInput
                label="Longitude"
                name="longitude"
                value={formData.locationOnMap.longitude}
                onChange={handleLocationChange}
                placeholder="e.g. 78.0322"
                type="number"
              />
            </div>
          </FormSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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

          <ImageUpload
            label="Property Image"
            imagePreview={featuredImagePreview}
            onImageChange={handleFeaturedImage}
          />

          <ImageUpload
            label="Image Gallery"
            isMultiple={true}
            onImageChange={handleGalleryImages}
            galleryPreviews={galleryPreviews}
            onRemoveGalleryImage={removeGalleryImage}
          />

          <FormSection title="Price" className="p-6">
            <div className="space-y-4">
              <FormInput
                label="Rent Per Month"
                name="rentPerMonth"
                value={formData.pricing.rentPerMonth}
                onChange={handlePricingChange}
                type="number"
              />
              <FormInput
                label="Security Deposit"
                name="securityDeposit"
                value={formData.pricing.securityDeposit}
                onChange={handlePricingChange}
                type="number"
              />
            </div>
          </FormSection>

          <FormSection title="Owner Details" className="p-6">
            <div className="space-y-4">
              <FormInput
                label="Current Owner Info"
                name="currentOwner"
                value={formData.khatuniDetails.currentOwner}
                onChange={handleKhatuniChange}
              />
              <FormInput
                label="Owner Number"
                name="currentOwnerPhoneNumber"
                value={formData.khatuniDetails.currentOwnerPhoneNumber}
                onChange={handleKhatuniChange}
                type="number"
              />
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
};

export default AddRentProperty;
