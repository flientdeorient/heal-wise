const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/User");
require('dotenv').config();

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { username, email, password, accountType, personalDetails } = req.body;

    // Check if user already exists
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new account with optional personalDetails
    const newAccount = new Account({
      username,
      email,
      passwordHash,
      accountType,
      personalDetails: personalDetails || {}
    });

    await newAccount.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newAccount._id,
        username: newAccount.username,
        accountType: newAccount.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in header
    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for existing user by email
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in header
    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};
