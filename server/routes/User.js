const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/Auth');

// No auth middleware needed for signup/login
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
