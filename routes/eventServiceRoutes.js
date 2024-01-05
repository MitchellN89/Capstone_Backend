const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

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

module.exports = router;
