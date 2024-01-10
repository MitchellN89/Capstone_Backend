const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

// Event Planner - Get event services
router.get(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.getEventServices
);

// Event Planner - Create new service
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.createEventService
);

// Event Planner - Update service
router.put(
  "/:eventServiceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.updateEventService
);

// Event Planner - Delete service
router.delete(
  "/:eventServiceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.deleteEventService
);

// Event Planner - Enable Broadcast
router.patch(
  "/:eventServiceId/broadcast/enable",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.enableBroadcast
);

// Event Planner - Disable Broadcast
router.patch(
  "/:eventServiceId/broadcast/disable",
  accountTypeChecker("eventPlanner"),
  Controllers.eventServiceController.disableBroadcast
);

// Event Planner - Get service connections
router.get(
  "/:eventServiceId/connections",
  accountTypeChecker("eventPlanner"),
  Controllers.serviceRequestController.getServiceConnections
);

// // Event Planner - get service connection by id
// router.get(
//   "/:eventServiceId/connections/:serviceConnectionId",
//   accountTypeChecker("eventPlanner"),
//   Controllers.serviceRequestController.getOneServiceConnectionById
// );

// Event Planner - get service connection by vendorId
router.get(
  "/:eventServiceId/connections/vendor/:vendorId",
  accountTypeChecker("eventPlanner"),
  Controllers.serviceRequestController.getOneServiceConnectionByVendorId
);

// EP - promote job to vendor
router.patch(
  "/:eventServiceId/connections/:serviceConnectionId/promoteVendor/:vendorId",
  Controllers.eventServiceController.promoteVendor
);

module.exports = router;
