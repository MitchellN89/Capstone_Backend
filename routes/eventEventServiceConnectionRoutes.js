const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Event Planner - Get service connections
router.get(
  "/",
  Controllers.eventServiceConnectionController.getServiceConnections
);

// Event Planner - get service connection by vendorId
router.get(
  "/vendor/:vendorId",
  Controllers.eventServiceConnectionController.getOneServiceConnectionByVendorId
);

// EP - promote job to vendor
router.patch(
  "/:serviceConnectionId/promoteVendor/:vendorId",
  Controllers.eventServiceController.promoteVendor
);

module.exports = router;
