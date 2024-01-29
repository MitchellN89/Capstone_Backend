const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Vendor - get service requests (eventServices)
router.get("/", Controllers.eventServiceController.getServiceRequests);

// Vendor - get one service request (eventService)
router.get(
  "/:eventServiceId",
  Controllers.eventServiceConnectionController.getOneServiceRequest
);

// Vendor - get one service connection
router.get(
  "/:eventServiceId/connection",
  Controllers.eventServiceConnectionController
    .getOneBlindVendorServiceConnection
);

// Vendor - create service request connection
router.post(
  "/:eventServiceId/connect",
  Controllers.eventServiceConnectionController.connectToServiceRequest
);

router.post(
  "/:eventServiceId/ignore",
  Controllers.eventServiceConnectionController.ignoreServiceRequest
);

module.exports = router;
