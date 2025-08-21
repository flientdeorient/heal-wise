const Account = require("../models/User");

// Update patient personal details
exports.updatePatientDetails = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { appointments, prescriptions, healthMetrics } = req.body;

    if (req.user.accountType !== "patient") {
      return res.status(403).json({ success: false, message: "Access denied: not a patient" });
    }

    // Validate at least one detail to update is provided
    if (!appointments && !prescriptions && !healthMetrics) {
      return res.status(400).json({ success: false, message: "No patient details provided to update" });
    }

    const updateData = {};
    if (appointments) updateData["personalDetails.appointments"] = appointments;
    if (prescriptions) updateData["personalDetails.prescriptions"] = prescriptions;
    if (healthMetrics) updateData["personalDetails.healthMetrics"] = healthMetrics;

    const updatedAccount = await Account.findOneAndUpdate(
      { _id: userId, accountType: "patient" },
      { $set: updateData, updatedAt: Date.now() },
      { new: true }
    ).select("-passwordHash");

    if (!updatedAccount) {
      return res.status(404).json({ success: false, message: "Patient account not found" });
    }

    res.status(200).json({
      success: true,
      message: "Patient details updated",
      personalDetails: updatedAccount.personalDetails
    });

  } catch (error) {
    console.error("Patient update error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update doctor personal details
exports.updateDoctorDetails = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { specialty, appointments, patients, prescriptionsIssued } = req.body;

    if (req.user.accountType !== "doctor") {
      return res.status(403).json({ success: false, message: "Access denied: not a doctor" });
    }

    if (!specialty && !appointments && !patients && !prescriptionsIssued) {
      return res.status(400).json({ success: false, message: "No doctor details provided to update" });
    }

    const updateData = {};
    if (specialty) updateData["personalDetails.specialty"] = specialty;
    if (appointments) updateData["personalDetails.appointments"] = appointments;
    if (patients) updateData["personalDetails.patients"] = patients;
    if (prescriptionsIssued) updateData["personalDetails.prescriptionsIssued"] = prescriptionsIssued;

    const updatedAccount = await Account.findOneAndUpdate(
      { _id: userId, accountType: "doctor" },
      { $set: updateData, updatedAt: Date.now() },
      { new: true }
    ).select("-passwordHash");

    if (!updatedAccount) {
      return res.status(404).json({ success: false, message: "Doctor account not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor details updated",
      personalDetails: updatedAccount.personalDetails
    });

  } catch (error) {
    console.error("Doctor update error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
