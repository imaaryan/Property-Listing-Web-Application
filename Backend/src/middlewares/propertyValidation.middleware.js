// Helper function for validation logic
const checkPricing = (propertyFor, pricing) => {
  if (propertyFor === "Buy") {
    if (!pricing?.askingPrice || !pricing?.finelPricing) {
      return 'For "Buy" properties, askingPrice and finelPricing are required in pricing object.';
    }
  } else if (propertyFor === "Rent") {
    if (!pricing?.rentPerMonth || !pricing?.securityDeposit) {
      return 'For "Rent" properties, rentPerMonth and securityDeposit are required in pricing object.';
    }
  }
  return null;
};

// Mongoose Pre-save Hook
export const validatePropertyPricing = function (next) {
  // 'this' refers to the document being saved
  const errorMsg = checkPricing(this.propertyFor, this.pricing);
  if (errorMsg) {
    return next(new Error(errorMsg));
  }
  next();
};

// Express Middleware for Routes
export const validatePropertyPricingExpress = (req, res, next) => {
  const { propertyFor, pricing } = req.body;
  const errorMsg = checkPricing(propertyFor, pricing);

  if (errorMsg) {
    return res.status(400).json({
      success: false,
      message: errorMsg,
    });
  }
  next();
};
