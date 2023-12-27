const express = require("express");
const router = express.Router();
const eventServiceRoutes = require("./eventServiceRoutes");

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

const Controllers = require("../controllers");

// Event Planner or Vendor - Get all events
router.get("/", (req, res) => {
  const { accountType } = req;

  // There are different routes here depending on what account type the user is
  switch (accountType) {
    case "eventPlanner":
      Controllers.eventPlanner.eventController.getEvents(req, res);
      break;
    case "vendor":
      Controllers.vendor.eventController.getEvents(req, res); //TODO - This is not yet implemented
  }
});

// Event Planner - Create new event
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventController.createEvent
);

// Event Planner - Update event
router.put(
  "/:eventId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventController.updateEvent
);

// Event Planner - Delete Event
router.delete(
  "/:eventId",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventController.deleteEvent
);

// this middleware will take the params in the path from below 'router.use("/:eventId/services") and will pass the eventId into the req so it can be picked up further down the route chain
router.param("eventId", (req, res, next, eventId) => {
  req.eventId = eventId;
  next();
});

router.use("/:eventId/services", eventServiceRoutes);

module.exports = router;
