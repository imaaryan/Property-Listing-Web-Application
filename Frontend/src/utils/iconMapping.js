import {
  RiHospitalLine,
  RiSchoolLine,
  RiBusLine,
  RiTrainLine,
  RiStoreLine,
  RiRestaurantLine,
  RiBankLine,
  RiGovernmentLine,
  RiCommunityLine,
  RiPoliceCarLine,
  RiGasStationLine,
  RiParkingBoxLine,
  RiBuilding2Line,
  RiHotelLine,
  RiInformationLine,
} from "@remixicon/react";

export const ICON_OPTIONS = [
  { id: "hospital", label: "Hospital", icon: RiHospitalLine },
  { id: "school", label: "School", icon: RiSchoolLine },
  { id: "bus", label: "Bus Station", icon: RiBusLine },
  { id: "train", label: "Train Station", icon: RiTrainLine },
  { id: "store", label: "Shopping", icon: RiStoreLine },
  { id: "restaurant", label: "Restaurant", icon: RiRestaurantLine },
  { id: "bank", label: "Bank", icon: RiBankLine },
  { id: "government", label: "Government", icon: RiGovernmentLine },
  { id: "park", label: "Park", icon: RiCommunityLine },
  { id: "police", label: "Police", icon: RiPoliceCarLine },
  { id: "fuel", label: "Petrol Pump", icon: RiGasStationLine },
  { id: "parking", label: "Parking", icon: RiParkingBoxLine },
  { id: "office", label: "Office", icon: RiBuilding2Line },
  { id: "hotel", label: "Hotel", icon: RiHotelLine },
  { id: "info", label: "Other", icon: RiInformationLine },
];

export const getIconComponent = (id) => {
  return ICON_OPTIONS.find((opt) => opt.id === id)?.icon || RiInformationLine;
};
