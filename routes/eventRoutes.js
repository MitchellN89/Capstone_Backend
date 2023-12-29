const express = require("express");
const router = express.Router();
const eventServiceRoutes = require("./eventServiceRoutes");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

const Controllers = require("../controllers");

// Event Planner & Vendor - Get all events
router.get("/", (req, res) => {
  // TODO - Consider reducing amount of data sent
  // TODO - Also, add query params to reduce payload
  const { accountType } = req;

  // There are different routes here depending on what account type the user is
  switch (accountType) {
    case "eventPlanner":
      Controllers.eventController.getEventPlannerEvents(req, res);
      break;
    case "vendor":
      res.status(400).json({ response: "No route available yet" });
  }
});

// Vendor - Get broadcast events
router.get(
  "/broadcasts",
  accountTypeChecker("vendor"),
  Controllers.eventController.getBroadcastEvents
);

// Event Planner or Vendor - Get ONE event
router.get("/:eventid", (req, res) => {
  const { accountType } = req;
  switch (accountType) {
    case "eventPlanner": //TODO - This is not yet implemented - will include eventServices
      break;
    case "vendor": //TODO - This is not yet implemented
  }
});

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
  eventServiceRoutes
);

module.exports = router;
