const responseFormatter = require("../utils/responseFormatter");
const STATUS_CODES = require("../utils/statusCodes");
const loginData = require("../dummyData/login");

exports.getUsers = async (req, res) => {
  try {
    // Respond with the list of users
    return await res
      .status(STATUS_CODES.OK)
      .json(
        responseFormatter(
          STATUS_CODES.OK,
          "User list retrieved successfully",
          loginData
        )
      );
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate request body
    if (!email || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(
          responseFormatter(
            STATUS_CODES.BAD_REQUEST,
            "Email and password are required"
          )
        );
    }

    // Find user based on email and password
    const user = loginData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Successful login
      return res.status(STATUS_CODES.OK).json(
        responseFormatter(STATUS_CODES.OK, "Login successful", {
          otp: user.otp,
        })
      );
    } else {
      // User not found
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json(
          responseFormatter(
            STATUS_CODES.UNAUTHORIZED,
            "Invalid email or password"
          )
        );
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate request body
    if (!email) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(responseFormatter(STATUS_CODES.BAD_REQUEST, "Email is required"));
    }

    // Find user based on email
    const user = loginData.find((user) => user.email === email);

    if (user) {
      // Simulate sending OTP (in a real scenario, you would send the OTP via email/SMS)
      return res.status(STATUS_CODES.OK).json(
        responseFormatter(STATUS_CODES.OK, "OTP sent successfully", {
          otp: user.otp,
        })
      );
    } else {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(responseFormatter(STATUS_CODES.NOT_FOUND, "User not found"));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate request body
    if (!email || !otp || !newPassword) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(
          responseFormatter(
            STATUS_CODES.BAD_REQUEST,
            "Email, OTP, and new password are required"
          )
        );
    }

    // Find user based on email
    const user = loginData.find((user) => user.email === email);

    if (user) {
      // Check if OTP matches
      if (user.otp === otp) {
        // Update password
        user.password = newPassword; // Update the password
        return res
          .status(STATUS_CODES.OK)
          .json(
            responseFormatter(STATUS_CODES.OK, "Password changed successfully")
          );
      } else {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json(responseFormatter(STATUS_CODES.UNAUTHORIZED, "Invalid OTP"));
      }
    } else {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(responseFormatter(STATUS_CODES.NOT_FOUND, "User not found"));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          STATUS_CODES.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred"
        )
      );
  }
};
