import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { divIcon } from "leaflet";
import Pin from "./Pin.jsx";

function Map({ items }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.log("Geolocation error:", err)
    );
  }, []);

  const mapCenter = currentLocation || [30.325053439645128, 78.00468719168197]; // Default: Dehradun
  const customIcon = divIcon({ className: "bg-blue-600 rounded-full w-3 h-3 border-2 border-white" });

  return (
    <MapContainer
      center={mapCenter}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full rounded-xl shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            price: item.pricing.price || item.pricing.rent,
            bedrooms: item.bedrooms,
            img: item.image,
          }}
        />
      ))}

      {/* User's current location */}
      {currentLocation && <Marker position={currentLocation} icon={customIcon} />}
    </MapContainer>
  );
}

export default Map;
