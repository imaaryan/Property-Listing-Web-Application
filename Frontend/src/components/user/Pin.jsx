import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { divIcon } from "leaflet";

const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36px" height="36px">
  <!-- White center background -->
  <circle cx="12" cy="9" r="3" fill="#fff" />

  <!-- Original icon -->
  <path fill="#2b59ed" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>
`;

function Pin({ item }) {
  const customIcon = divIcon({
    className: "",
    html: `${iconSVG}`,
    iconSize: [46, 46],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="w-44">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <div className="flex flex-col gap-1 text-sm">
            <Link
              to={`/${item.id}`}
              className="font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item.title}
            </Link>
            {item.bedrooms > 0 && (
              <span className="text-gray-500">{item.bedrooms} Bedrooms</span>
            )}
            <b className="text-green-600 text-sm">
              ₹ {item.price?.toLocaleString()}
            </b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
