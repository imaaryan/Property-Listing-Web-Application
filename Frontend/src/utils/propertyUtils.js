export const YARD_TYPES = [
  "Residential Plot",
  "Commercial Plot",
  "Warehouse / Godown",
  "Agricultural Land",
];

export const isYardType = (type) => YARD_TYPES.includes(type);

export const formatPrice = (amount) => {
  if (!amount) return "0";
  if (amount >= 10000000) {
    return (amount / 10000000).toFixed(2) + " Cr.";
  } else if (amount >= 100000) {
    return (amount / 100000).toFixed(2) + " Lakh";
  } else {
    return amount.toLocaleString("en-IN");
  }
};

export const convertToYardsIfNeeded = (size, type, sizeInYard) => {
  if (isYardType(type)) {
    if (sizeInYard) return { size: sizeInYard, unit: "sq. yards" };
    // If sizeInYard not pre-populated, convert from sq ft
    const inYards = size ? Math.round(size / 9) : 0;
    return { size: inYards, unit: "sq. yards" };
  }
  return { size: size || 0, unit: "sq. ft" };
};
