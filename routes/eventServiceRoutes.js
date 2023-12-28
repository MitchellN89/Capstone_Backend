const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

router.get("/");

// Event Planner - Create new service
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.createEventService
);

// Event Planner - Update service
router.put(
  "/:serviceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.updateEventService
);

// Event Planner - Delete service
router.delete(
  "/:serviceId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventServiceController.deleteEventService
);

// Event Planner - Toggle Broadcast
router.patch("/", accountTypeChecker);

module.exports = router;
