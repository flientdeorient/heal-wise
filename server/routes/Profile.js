const express = require('express');
const router = express.Router();

const { updateDoctorDetails, updatePatientDetails } = require('../controllers/PersonalDetails');
const { auth, patient, doctor } = require("../middleware/auth");

// Route for patient profile update
router.put('/patient/updateProfile', auth, patient, updatePatientDetails);

// Route for doctor profile update
router.put('/doctor/updateProfile', auth, doctor, updateDoctorDetails);

module.exports = router;
