import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBinLine, RiAddLine } from "@remixicon/react";
import FormSection from "../../components/admin/property/FormSection";
import FormInput from "../../components/admin/property/FormInput";

const Amenities = () => {
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAmenities = async () => {
    try {
      const res = await axios.get(`${backendUrl}/master/amenities`);
      if (res.data.success) {
        setAmenities(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load amenities");
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [backendUrl]);

  // Pagination Helper
  const paginatedAmenities = amenities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(amenities.length / itemsPerPage);

  const handleAddAmenity = async (e) => {
    e.preventDefault();
    if (!newAmenity.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/master/amenity`,
        { name: newAmenity },
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      if (res.data.success) {
        toast.success("Amenity added successfully");
        setNewAmenity("");
        fetchAmenities();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding amenity");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAmenity = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/master/amenity/${id}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (res.data.success) {
        toast.success("Amenity deleted");
        fetchAmenities();
      }
    } catch (error) {
      toast.error("Error deleting amenity");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Amenities</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage Property Amenities
          </p>
        </div>
      </div>

      <FormSection title="Create Amenity">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Add Form */}
          <form
            onSubmit={handleAddAmenity}
            className="w-full md:w-1/3 flex gap-4 items-end"
          >
            <FormInput
              label="Amenity Name"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              placeholder="e.g. Swimming Pool"
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
                    <th>Amenity Name</th>
                    {/* Placeholder for now as per design request, though backend doesn't support count yet easily */}
                    {/* <th>No. Properties</th>  */}
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {amenities.length === 0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-8 text-gray-400"
                      >
                        No amenities found
                      </td>
                    </tr>
                  ) : (
                    paginatedAmenities.map((amenity) => (
                      <tr key={amenity._id} className="hover">
                        <td className="font-medium text-gray-800">
                          {amenity.name}
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => handleDeleteAmenity(amenity._id)}
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

            {/* Pagination Controls */}
            {amenities.length > itemsPerPage && (
              <div className="flex justify-between items-center p-4 border-t border-gray-100">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="btn btn-sm btn-ghost"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
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
  );
};

export default Amenities;
