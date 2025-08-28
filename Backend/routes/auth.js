const express = require("express");
const router = express.Router();
// Import all three controller functions
const { login, signup, getProfile } = require("../controllers/authController");
// Import your middleware
const authMiddleware = require("../middleware/authMiddleware");

// Public routes for signup and login
router.post("/signup", signup);
router.post("/login", login);

// Private route for getting the user profile
// The authMiddleware will run first. If the token is valid, it will call getProfile.
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
