const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Vendor - get service requests
router.get("/", Controllers.serviceRequestController.getServiceRequests);

// Vendor - get one service request
router.get(
  "/:serviceRequestId",
  Controllers.serviceRequestController.getOneServiceRequest
);

// Vendor - create service request connection
router.post(
  "/:serviceRequestId/connect",
  Controllers.serviceRequestController.connectToServiceRequest
);

// Vendor - update service request connection

module.exports = router;
