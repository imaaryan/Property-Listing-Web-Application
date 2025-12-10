import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { RiHotelBedFill, RiHandSanitizerFill } from "@remixicon/react";
import { divIcon } from "leaflet";

const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="40px">
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
    iconSize: [40, 40],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2) + " Cr.";
    } else if (amount >= 100000) {
      return (amount / 100000).toFixed(2) + " Lakh";
    } else {
      return amount.toLocaleString("en-IN");
    }
  };

  const pricing =
    item.propertyFor === "Buy"
      ? formatPrice(item.price)
      : formatPrice(item.price) + "/month";

  const navigate = useNavigate();

  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="flex gap-2  group cursor-pointer">
          <div className="w-1/2">
            <img
              src={item.img}
              alt={item.title + " image"}
              className="aspect-3/2  w-full object-cover object-center rounded-md"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-1 text-sm ">
              <h2
                className="text-base max-sm:text-sm font-medium line-clamp-2 cursor-pointer group-hover:text-primary"
                onClick={() =>
                  navigate(
                    `/property/${
                      item.propertyFor === "Buy" ? "sale" : "rent"
                    }/${item.id}`
                  )
                }
              >
                {item.title}
              </h2>
              <div className="flex flex-row justify-start gap-4 text-gray-500">
                <div
                  className={
                    !item.bedrooms
                      ? "hidden"
                      : "flex flex-row items-center gap-2"
                  }
                >
                  <RiHotelBedFill size={18} /> {item.bedrooms}
                </div>

                <div
                  className={
                    !item.bathrooms
                      ? "hidden"
                      : "flex flex-row items-center gap-2"
                  }
                >
                  <RiHandSanitizerFill size={17} /> {item.bathrooms}
                </div>
              </div>
              <h3 className="text-base font-medium ">₹{pricing}</h3>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
