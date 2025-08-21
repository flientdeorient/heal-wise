const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      (req.cookies && req.cookies.token) ||
      (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null) ||
      (req.body && req.body.token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token isn't valid",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate.",
      error: error.message,
    });
  }
};


// Patient role middleware
exports.patient = async (req, res, next) => {
  try {
    if (req.user.accountType !== "patient") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for patients only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type cannot be verified, please try again.",
      error: error.message,
    });
  }
};

// Doctor role middleware
exports.doctor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for doctors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type cannot be verified, please try again.",
      error: error.message,
    });
  }
};

// Admin role middleware
exports.admin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account type cannot be verified, please try again.",
      error: error.message,
    });
  }
};
