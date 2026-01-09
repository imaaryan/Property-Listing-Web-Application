import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import Pin from "./Pin.jsx";
import { getIconComponent } from "../../utils/iconMapping";

import { latLngBounds } from "leaflet";

// Helper component to re-center map when 'center' prop changes
const RecenterAutomatically = ({ center, zoom, items }) => {
  const map = useMap();

  useEffect(() => {
    if (items && items.length > 0) {
      const bounds = latLngBounds(
        items.map((item) => [
          item.locationOnMap.latitude,
          item.locationOnMap.longitude,
        ])
      );
      // Pad the bounds slightly so pins aren't on the very edge
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map, items]);
  return null;
};

function Map({ items, center, amenities = [] }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Filter out items without valid location data to prevent crashes
  const validItems = items.filter(
    (item) => item?.locationOnMap?.latitude && item?.locationOnMap?.longitude
  );

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

  // Merge items and amenities for bounds calculation
  const allPoints = [
    ...validItems,
    ...amenities.map((a) => ({
      locationOnMap: a.location,
    })),
  ];

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
        items={allPoints.length > 0 ? allPoints : validItems}
        center={center || currentLocation}
        zoom={center ? 14 : 11}
      />

      {/* Render property markers */}
      {validItems.map((item) => (
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

      {/* Render Amenity Markers */}
      {amenities.map((amenity, index) => {
        const IconComponent = getIconComponent(amenity.icon);
        const iconHtml = renderToStaticMarkup(
          <div className="bg-white text-blue-600 p-1.5 rounded-full border-2 border-blue-600 shadow-md flex items-center justify-center w-8 h-8">
            <IconComponent size={16} />
          </div>
        );

        const amenityIcon = divIcon({
          html: iconHtml,
          className: "bg-transparent",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        return (
          <Marker
            key={`amenity-${index}`}
            position={[amenity.location.latitude, amenity.location.longitude]}
            icon={amenityIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-gray-800 text-sm mb-1">
                  {amenity.name}
                </h3>
                {amenity.description && (
                  <p className="text-xs text-gray-600 leading-snug">
                    {amenity.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* User's current location */}
      {currentLocation && (
        <Marker position={currentLocation} icon={customIcon} />
      )}
    </MapContainer>
  );
}

export default Map;
