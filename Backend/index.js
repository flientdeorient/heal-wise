// import express from 'express';
const express = require("express");
// import dotenv from 'dotenv';
const dotenv = require("dotenv");

const cors = require("cors");
const connectDB = require("./config/db.js");
const router = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080", // Your frontend origin
    credentials: true, // Optional: If you're sending cookies
  })
);
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
