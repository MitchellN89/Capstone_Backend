const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Vendor - get service requests
router.get("/", Controllers.serviceRequestController.getServiceRequests);

// Vendor - create service request connection

// Vendor - update service request connection

module.exports = router;
