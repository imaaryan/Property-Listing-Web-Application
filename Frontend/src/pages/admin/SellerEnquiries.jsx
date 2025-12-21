import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  RiDeleteBinLine,
  RiCheckDoubleLine,
  RiMailUnreadLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMore2Fill,
} from "@remixicon/react";

const SellerEnquiries = () => {
  const { backendUrl } = useContext(AppContext);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/enquiries/all`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [backendUrl]);

  // Actions
  const handleMarkAsRead = async (id) => {
    try {
      const res = await axios.patch(
        `${backendUrl}/enquiries/${id}/read`,
        {},
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      if (res.data.success) {
        toast.success("Marked as read");
        fetchEnquiries();
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleMarkAsUnread = async (id) => {
    try {
      const res = await axios.patch(
        `${backendUrl}/enquiries/${id}/unread`,
        {},
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      if (res.data.success) {
        toast.success("Marked as unread");
        fetchEnquiries();
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?"))
      return;
    try {
      const res = await axios.delete(`${backendUrl}/enquiries/${id}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (res.data.success) {
        toast.success("Enquiry deleted");
        fetchEnquiries();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Pagination Logic
  const paginatedEnquiries = enquiries.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Seller Enquiries</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your incoming seller requests
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="table w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-600 text-sm">
                <th className="py-4 px-6 font-medium text-left">Name/Email</th>
                <th className="py-4 px-6 font-medium text-left">
                  Contact Info
                </th>
                <th className="py-4 px-6 font-medium text-left">
                  Property Details
                </th>
                <th className="py-4 px-6 font-medium text-left w-1/3">
                  Message
                </th>
                <th className="py-4 px-6 font-medium text-center">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-400">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className={`hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                      !enquiry.isRead ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800">
                        {enquiry.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-700">
                        {enquiry.phone}
                      </div>
                      <div
                        className="text-sm text-gray-500 truncate max-w-[150px]"
                        title={enquiry.address}
                      >
                        {enquiry.address}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="badge badge-outline border-primary/20 text-primary bg-primary/5">
                        {enquiry.propertyType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p
                        className="text-sm text-gray-600 line-clamp-2"
                        title={enquiry.message}
                      >
                        {enquiry.message}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {/* Mobile/Badge Status Indicator - Hidden on large screens if row color is enough, but good for clarity */}
                      {!enquiry.isRead ? (
                        <span
                          className="inline-block w-2 h-2 rounded-full bg-blue-500"
                          title="Unread"
                        ></span>
                      ) : (
                        <span
                          className="inline-block w-2 h-2 rounded-full bg-gray-300"
                          title="Read"
                        ></span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-sm btn-ghost btn-circle text-gray-500"
                        >
                          <RiMore2Fill size={20} />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-10 menu p-2 shadow-lg bg-white rounded-box w-48 border border-gray-100"
                        >
                          {!enquiry.isRead ? (
                            <li>
                              <button
                                onClick={() => handleMarkAsRead(enquiry._id)}
                                className="text-gray-700 hover:text-primary"
                              >
                                <RiCheckDoubleLine size={16} /> Mark as Read
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() => handleMarkAsUnread(enquiry._id)}
                                className="text-gray-700 hover:text-blue-500"
                              >
                                <RiMailUnreadLine size={16} /> Mark as Unread
                              </button>
                            </li>
                          )}
                          <div className="divider my-1"></div>
                          <li>
                            <button
                              onClick={() => handleDelete(enquiry._id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <RiDeleteBinLine size={16} /> Delete
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

        {/* Pagination */}
        {enquiries.length > itemsPerPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn btn-sm bg-white border border-gray-200 hover:bg-gray-100 disabled:bg-transparent disabled:border-transparent"
            >
              <RiArrowLeftSLine size={16} /> Previous
            </button>
            <span className="text-sm font-medium text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn btn-sm bg-white border border-gray-200 hover:bg-gray-100 disabled:bg-transparent disabled:border-transparent"
            >
              Next <RiArrowRightSLine size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerEnquiries;
