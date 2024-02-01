const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Get services
router.get("/", Controllers.serviceController.getServices);

module.exports = router;
