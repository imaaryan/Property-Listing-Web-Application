import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiMoreLine,
  RiPencilLine,
  RiEyeLine,
  RiDeleteBinLine,
  RiSearchLine,
  RiFilter3Line,
} from "@remixicon/react";
import { toast } from "react-toastify";

const BuyListings = () => {
  const { backendUrl } = useContext(AppContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/properties/get-all?propertyFor=Buy&limit=100`
      );
      if (data.success) {
        setProperties(data.data);
      }
    } catch (error) {
      console.error("Error fetching buy listings:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [backendUrl]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/properties/delete/${id}`
        );
        if (data.success) {
          toast.success("Property deleted successfully");
          fetchProperties();
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-display">
            Properties for Sale
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your buy listings from here
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 gap-2 normal-case font-medium shadow-sm h-11 min-h-0 rounded-lg"
            >
              Bulk Action
              <RiArrowDownSLine size={18} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu p-2 shadow-xl bg-white rounded-xl w-52 border border-gray-100 mt-2"
            >
              <li>
                <a className="hover:bg-red-50 hover:text-red-600 rounded-lg py-2">
                  Delete Selected
                </a>
              </li>
              <li>
                <a className="hover:bg-blue-50 hover:text-blue-600 rounded-lg py-2">
                  Mark as Sold
                </a>
              </li>
            </ul>
          </div>

          <Link
            to="/admin/buy-listings/add"
            className="btn btn-primary text-white gap-2 normal-case font-medium shadow-lg shadow-primary/30 h-11 min-h-0 rounded-lg px-6 hover:brightness-110 transition-all"
          >
            <RiAddLine size={20} />
            Add Property
          </Link>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 overflow-hidden">
        {/* Filters & Search Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left side actions (Filters placeholder) */}
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-ghost gap-2 text-gray-500 font-normal hover:bg-gray-50">
              <RiFilter3Line size={16} />
              Filter
            </button>
          </div>

          {/* Right side search */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search properties..."
              className="input input-bordered w-full pl-10 bg-gray-50/50 focus:bg-white focus:border-primary transition-all rounded-lg h-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="w-12 py-4">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded text-primary border-gray-300"
                    />
                  </label>
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">
                  Property Name
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">
                  Location
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">
                  Date
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">
                  Status
                </th>
                <th className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-4 text-right pr-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-20">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <RiSearchLine size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium text-gray-500">
                        No properties found
                      </p>
                      <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr
                    key={property._id}
                    className="group hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="py-4">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded text-primary border-gray-300"
                        />
                      </label>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        {/* Featured Image */}
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-gray-100 ring-1 ring-gray-100 group-hover:ring-blue-100 transition-all">
                            <img
                              src={
                                property.images?.featuredImage ||
                                "https://placehold.co/100"
                              }
                              alt="Property"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 line-clamp-1 max-w-[200px] mb-0.5">
                            {property.title}
                          </div>
                          <div className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded">
                            {property.propertyType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-gray-600 font-medium">
                        {property.areaId?.name}, {property.areaId?.city?.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        Uttarakhand
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm text-gray-600 font-medium">
                        {formatDate(property.createdAt)}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {" "}
                        Added Date{" "}
                      </div>
                    </td>
                    <td className="py-4">
                      {property.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="text-right py-4 pr-6">
                      <div className="dropdown dropdown-left dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-sm btn-square text-gray-400 hover:text-primary hover:bg-blue-50 transition-colors"
                        >
                          <RiMoreLine size={20} />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-20 menu p-2 shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-white rounded-xl w-48 border border-gray-100 mt-1"
                        >
                          <li>
                            <Link
                              to={`/admin/buy-listings/edit/${property._id}`}
                              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-2"
                            >
                              <RiPencilLine size={18} /> Edit Details
                            </Link>
                          </li>
                          <li>
                            <a
                              href={`${window.location.origin}/property/sale/${property._id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-2"
                            >
                              <RiEyeLine size={18} /> View Listing
                            </a>
                          </li>
                          <div className="h-px bg-gray-50 my-1"></div>
                          <li>
                            <button
                              onClick={() => handleDelete(property._id)}
                              className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg py-2"
                            >
                              <RiDeleteBinLine size={18} /> Delete Property
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Static) */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 text-sm text-gray-500 bg-gray-50/30">
          <div>
            Showing 1-{filteredProperties.length} of {filteredProperties.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-white border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50"
              disabled
            >
              Previous
            </button>
            <div className="join">
              <button className="join-item btn btn-sm btn-primary text-white">
                1
              </button>
              {/* Add logic if more pages */}
            </div>
            <button
              className="btn btn-sm btn-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyListings;
