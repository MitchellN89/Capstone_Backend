const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

router.get("/"); //FIX ME - need to implement??

// Event Planner - Create new service
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.createEventService
);

// Event Planner - Update service
router.put(
  "/:eventServiceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.updateEventService
);

// Event Planner - Delete service
router.delete(
  "/:eventServiceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.deleteEventService
);

// Event Planner - Enable Broadcast
router.patch(
  "/:eventServiceId/broadcast/enable",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.enableBroadcast
);

// Event Planner - Disable Broadcast
router.patch(
  "/:eventServiceId/broadcast/disable",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.disableBroadcast
);

module.exports = router;
