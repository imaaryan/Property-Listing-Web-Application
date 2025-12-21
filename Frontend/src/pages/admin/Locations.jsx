import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  RiDeleteBinLine,
  RiAddLine,
  RiMapPinLine,
  RiBuildingLine,
} from "@remixicon/react";
import FormSection from "../../components/admin/property/FormSection";
import FormInput from "../../components/admin/property/FormInput";
import FormSelect from "../../components/admin/property/FormSelect";

const Locations = () => {
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  // Form States
  const [newCity, setNewCity] = useState("");
  const [newArea, setNewArea] = useState({ name: "", cityId: "" });

  // Fetch Data
  const fetchCities = async () => {
    try {
      const res = await axios.get(`${backendUrl}/master/cities`);
      if (res.data.success) {
        setCities(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cities");
    }
  };

  const fetchAreas = async (cityId = "") => {
    try {
      const url = cityId
        ? `${backendUrl}/master/areas?cityId=${cityId}`
        : `${backendUrl}/master/areas`;
      const res = await axios.get(url);
      if (res.data.success) {
        setAreas(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load areas");
    }
  };

  // Pagination State
  const [cityPage, setCityPage] = useState(1);
  const [areaPage, setAreaPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, [backendUrl]);

  // Pagination Helpers
  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  // Handlers
  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!newCity.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/master/city`,
        { name: newCity, showOnFooter: true },
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      if (res.data.success) {
        toast.success("City added successfully");
        setNewCity("");
        fetchCities();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding city");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCity = async (id) => {
    if (!window.confirm("Are you sure? This will delete all associated areas."))
      return;
    try {
      const res = await axios.delete(`${backendUrl}/master/city/${id}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (res.data.success) {
        toast.success("City deleted");
        fetchCities();
        fetchAreas(); // Associated areas might be gone
      }
    } catch (error) {
      toast.error("Error deleting city");
    }
  };

  const handleAddArea = async (e) => {
    e.preventDefault();
    if (!newArea.name.trim() || !newArea.cityId) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/master/area`,
        { name: newArea.name, cityId: newArea.cityId },
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      if (res.data.success) {
        toast.success("Area added successfully");
        setNewArea({ name: "", cityId: "" });
        fetchAreas();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding area");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArea = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/master/area/${id}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (res.data.success) {
        toast.success("Area deleted");
        fetchAreas();
      }
    } catch (error) {
      toast.error("Error deleting area");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Locations Management
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage Cities and Areas
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* TOP SECTION: City Management */}
        <FormSection title="Create City">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Add Form */}
            <form
              onSubmit={handleAddCity}
              className="w-full md:w-1/3 flex gap-4 items-end"
            >
              <FormInput
                label="City Name"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="e.g. Dehradun"
                required
                className="flex-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-white h-12 mb-[2px]"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <RiAddLine size={20} /> Add
                  </>
                )}
              </button>
            </form>

            {/* List Table */}
            <div className="w-full md:w-2/3 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600">
                      <th>City Name</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cities.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="text-center py-8 text-gray-400"
                        >
                          No cities found
                        </td>
                      </tr>
                    ) : (
                      paginate(cities, cityPage).map((city) => (
                        <tr key={city._id} className="hover">
                          <td className="font-medium text-gray-800">
                            {city.name}
                          </td>
                          <td className="text-right">
                            <button
                              onClick={() => handleDeleteCity(city._id)}
                              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                            >
                              <RiDeleteBinLine size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* City Pagination */}
              {cities.length > itemsPerPage && (
                <div className="flex justify-between items-center p-4 border-t border-gray-100">
                  <button
                    disabled={cityPage === 1}
                    onClick={() => setCityPage((p) => p - 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {cityPage} of {totalPages(cities)}
                  </span>
                  <button
                    disabled={cityPage === totalPages(cities)}
                    onClick={() => setCityPage((p) => p + 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </FormSection>

        {/* BOTTOM SECTION: Area Management */}
        <FormSection title="Create Area">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Add Area Form */}
            <form
              onSubmit={handleAddArea}
              className="w-full md:w-1/3 space-y-4"
            >
              <FormSelect
                label="Select City"
                value={newArea.cityId}
                onChange={(e) =>
                  setNewArea({ ...newArea, cityId: e.target.value })
                }
                options={cities.map((c) => ({ value: c._id, label: c.name }))}
                required
              />
              <div className="flex gap-4 items-end">
                <FormInput
                  label="Area Name"
                  value={newArea.name}
                  onChange={(e) =>
                    setNewArea({ ...newArea, name: e.target.value })
                  }
                  placeholder="e.g. Rajpur Road"
                  required
                  className="flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary text-white h-12 mb-[2px]"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <RiAddLine size={20} /> Add
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* List Table */}
            <div className="w-full md:w-2/3 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col">
              <div className="overflow-x-auto max-h-[400px]">
                <table className="table w-full table-pin-rows">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600">
                      <th>Area Name</th>
                      <th>City</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-8 text-gray-400"
                        >
                          No areas found
                        </td>
                      </tr>
                    ) : (
                      paginate(areas, areaPage).map((area) => (
                        <tr key={area._id} className="hover">
                          <td className="font-medium text-gray-800">
                            {area.name}
                          </td>
                          <td className="text-gray-500 text-sm">
                            <span className="badge badge-ghost badge-sm">
                              {area.city?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="text-right">
                            <button
                              onClick={() => handleDeleteArea(area._id)}
                              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                            >
                              <RiDeleteBinLine size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Area Pagination */}
              {areas.length > itemsPerPage && (
                <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-white sticky bottom-0">
                  <button
                    disabled={areaPage === 1}
                    onClick={() => setAreaPage((p) => p - 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {areaPage} of {totalPages(areas)}
                  </span>
                  <button
                    disabled={areaPage === totalPages(areas)}
                    onClick={() => setAreaPage((p) => p + 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default Locations;
