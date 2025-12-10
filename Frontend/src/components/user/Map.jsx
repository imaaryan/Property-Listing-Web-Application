import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { divIcon } from "leaflet";
import Pin from "./Pin.jsx";

// Helper component to re-center map when 'center' prop changes
const RecenterAutomatically = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13); // Zoom in a bit more (13) as requested
    }
  }, [center, zoom, map]);
  return null;
};

function Map({ items, center }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Only fetch geolocation if NO center is provided (e.g. initial load without filters)
    // and we haven't already fetched it.
    if (!center && !currentLocation) {
      // Fallback to Dehradun if geolocation fails or permission denied, handled by default state below logic?
      // Actually, let's just try getting it.
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.log("Geolocation error:", err)
      );
    }
  }, [center, currentLocation]);

  // Default: Dehradun if nothing else
  const mapCenter = center ||
    currentLocation || [30.325053439645128, 78.00468719168197];

  const customIcon = divIcon({
    className: "bg-blue-600 rounded-full w-3 h-3 border-2 border-white",
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={11}
      scrollWheelZoom={false}
      className="w-full h-full rounded-xl shadow-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Auto Re-center when props change */}
      <RecenterAutomatically
        center={center || currentLocation}
        zoom={center ? 14 : 11}
      />

      {/* Render property markers */}
      {items.map((item) => (
        <Pin
          key={item._id}
          item={{
            latitude: item.locationOnMap.latitude,
            longitude: item.locationOnMap.longitude,
            title: item.title,
            id: item._id,
            price: item.pricing?.finelPricing || item.pricing?.rentPerMonth,
            bedrooms: item.bedrooms,
            img: item.images?.featuredImage,
            bathrooms: item.bathrooms,
            propertyFor: item.propertyFor,
          }}
        />
      ))}

      {/* User's current location */}
      {currentLocation && (
        <Marker position={currentLocation} icon={customIcon} />
      )}
    </MapContainer>
  );
}

export default Map;
