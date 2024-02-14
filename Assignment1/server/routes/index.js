// routes/index.js
const express = require("express");
const {
  RegistrationController
} = require("../controller/RegistrationController");
const { SinginController } = require("../controller/SinginController");
const router = express.Router();

// Define your routes
router.post("/hello", RegistrationController);
router.post("/singin", SinginController);
module.exports = router;
