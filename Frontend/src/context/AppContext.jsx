import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    `http://${window.location.hostname}:4001/api/v1`;
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
    // Initial check
    checkConnection();

    // Axios interceptor to catch network errors globaly
    const interceptor = axios.interceptors.response.use(
      (response) => {
        // If we get a successful response, we assume backend is up
        if (!isConnected) setIsConnected(true);
        return response;
      },
      (error) => {
        if (!error.response || error.code === "ERR_NETWORK") {
          // Network error or no response from server
          setIsConnected(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [isConnected]);

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
