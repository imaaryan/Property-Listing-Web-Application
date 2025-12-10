import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4001/api/v1";
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Load location from local storage on mount
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      try {
        setUserLocation(JSON.parse(storedLocation));
      } catch (error) {
        console.error("Failed to parse user location:", error);
        localStorage.removeItem("userLocation");
      }
    }
    setLoadingLocation(false);
  }, []);

  const updateUserLocation = (city, area) => {
    const location = { city, area };
    setUserLocation(location);
    localStorage.setItem("userLocation", JSON.stringify(location));
  };

  const checkConnection = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/healthcheck`);
      if (data.success) {
        setIsConnected(true);
        console.log("Backend Connected Successfully");
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Backend Connection Failed:", error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const value = {
    backendUrl,
    isConnected,
    checkConnection,
    loading,
    userLocation,
    updateUserLocation,
    loadingLocation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
