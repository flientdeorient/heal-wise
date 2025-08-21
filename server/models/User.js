const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  appointments: [
    {
      date: Date,
      doctorId: mongoose.Schema.Types.ObjectId,
      reason: String,
      status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled",
      },
    },
  ],
  prescriptions: [
    {
      medication: String,
      dosage: String,
      prescribedDate: Date,
      doctorId: mongoose.Schema.Types.ObjectId,
    },
  ],
  healthMetrics: {
    weight: Number, // in kg
    height: Number, // in cm
    bloodPressure: String, // e.g., '120/80'
    bloodSugar: Number, // e.g., fasting level
    records: [
      {
        type: String,
        description: String,
        date: Date,
        fileUrl: String, // link to uploaded health record file
      },
    ],
  },
});

const doctorSchema = new mongoose.Schema({
  specialty: String,
  appointments: [
    {
      date: Date,
      patientId: mongoose.Schema.Types.ObjectId,
      reason: String,
      status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled",
      },
    },
  ],
  patients: [
    {
      patientId: mongoose.Schema.Types.ObjectId,
      lastVisit: Date,
    },
  ],
  prescriptionsIssued: [
    {
      prescriptionId: mongoose.Schema.Types.ObjectId,
      date: Date,
    },
  ],
});

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  personalDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

accountSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Account", accountSchema);
