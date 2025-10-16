import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const healthcheck = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is Running" }));
  } catch (error) {
    res.status(400).json(new ApiError(400, "Something Went Wrong", error));
  }
};

export { healthcheck };
