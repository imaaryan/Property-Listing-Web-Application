import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import {
  RiBuilding2Line,
  RiHomeSmile2Line,
  RiMapPinLine,
  RiCommunityLine,
  RiUserVoiceLine,
} from "@remixicon/react";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const [stats, setStats] = useState({
    sellProperties: 0,
    rentProperties: 0,
    cities: 0,
    areas: 0,
    enquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Parallel fetching for better performance
        const [buyRes, rentRes, citiesRes, areasRes, enquiriesRes] =
          await Promise.all([
            axios.get(
              `${backendUrl}/properties/get-all?propertyFor=Buy&limit=1`
            ),
            axios.get(
              `${backendUrl}/properties/get-all?propertyFor=Rent&limit=1`
            ),
            axios.get(`${backendUrl}/master/cities`),
            axios.get(`${backendUrl}/master/areas`),
            axios.get(`${backendUrl}/enquiries`),
          ]);

        setStats({
          sellProperties: buyRes.data.total || 0,
          rentProperties: rentRes.data.total || 0,
          cities: citiesRes.data.data?.length || 0,
          areas: areasRes.data.data?.length || 0,
          enquiries: enquiriesRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [backendUrl]);

  const statCards = [
    {
      title: "Active Properties to Sell",
      count: stats.sellProperties,
      icon: RiBuilding2Line,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Properties to Rent",
      count: stats.rentProperties,
      icon: RiHomeSmile2Line,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Cities",
      count: stats.cities,
      icon: RiMapPinLine,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Areas",
      count: stats.areas,
      icon: RiCommunityLine,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Enquiries",
      count: stats.enquiries,
      icon: RiUserVoiceLine,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-[#EBEFFC] p-6 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1"
          >
            <div
              className={`p-3 rounded-lg ${card.bg} ${card.color} bg-white/50`}
            >
              <card.icon size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 font-display">
                {card.count}
              </h3>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts/tables */}
      <div className="mt-8 flex items-center justify-center min-h-[400px] border-2 border-dashed border-gray-200 rounded-xl bg-white/50">
        <p className="text-gray-400">Chart or Activity Feed Placeholder</p>
      </div>
    </div>
  );
};

export default Dashboard;
