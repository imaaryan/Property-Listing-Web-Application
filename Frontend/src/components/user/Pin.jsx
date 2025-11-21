import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
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
