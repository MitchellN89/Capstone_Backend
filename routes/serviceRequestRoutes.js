const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Vendor - get service requests (eventServices)
router.get("/", Controllers.serviceRequestController.getServiceRequests);

// Vendor - get one service request (eventService)
router.get(
  "/:serviceRequestId",
  Controllers.serviceRequestController.getOneServiceRequest
);

// Vendor - get one service connection
router.get(
  "/:serviceRequestId/connection",
  Controllers.serviceConnectionController.getOneBlindVendorServiceConnection
);

// Vendor - create service request connection
router.post(
  "/:serviceRequestId/connect",
  Controllers.serviceRequestController.connectToServiceRequest
);

// Vendor - accept offer
router.patch(
  "/:serviceRequestId/:serviceConnectionId/acceptoffer",
  Controllers.serviceConnectionController.acceptEventServiceOffer
);

module.exports = router;
