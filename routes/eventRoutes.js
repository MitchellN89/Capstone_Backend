const express = require("express");
const router = express.Router();
const eventEventServiceRoutes = require("./eventEventServiceRoutes");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

const Controllers = require("../controllers");

// Event Planner & Vendor - Get all events
router.get("/", (req, res) => {
  const { accountType } = req;

  // There are different routes here depending on what account type the user is.
  // Therefore, I've used a switch to route the user to the correct controller
  switch (accountType) {
    case "eventPlanner":
      Controllers.eventController.getEventPlannerEvents(req, res);
      break;
    case "vendor":
      Controllers.eventServiceController.getVendorEventServices(req, res);
      break;
    default:
  }
});

// Vendor - Get ONE Event
router.get(
  "/:eventId",
  accountTypeChecker("vendor"),
  Controllers.eventController.getVendorEvent
);

// Event Planner - Create new event
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventController.createEvent
);

// Event Planner - Update event
router.put(
  "/:eventId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventController.updateEvent
);

// Event Planner - Delete Event
router.delete(
  "/:eventId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventController.deleteEvent
);

// ROUTES END HERE, MIDDLEWARE & CHAINING BELOW

// this middleware will take the params in the path from below 'router.use("/:eventId/services") and will pass the eventId into the req so it can be picked up further down the route chain
router.param("eventId", (req, res, next, eventId) => {
  req.eventId = eventId;
  next();
});

// Chaining on eventServices routes
router.use(
  "/:eventId/services",
  accountTypeChecker("eventPlanner"),
  eventEventServiceRoutes
);

module.exports = router;
