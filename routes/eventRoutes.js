const express = require("express");
const router = express.Router();
// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

const Controllers = require("../controllers");

// Event Planner or Vendor - Get all events
router.get("/", (req, res) => {
  const { accountType } = req;

  // There are different routes here depending on what account type the user is
  switch (accountType) {
    case "eventPlanner":
      Controllers.eventPlanner.eventController.getAllEvents(req, res);
      break;
    case "vendor":
      Controllers.vendor.eventController.getAllEvents(req, res); //TODO - This is not yet implemented
  }
});

// Event Planner - Create new event
router.post(
  "/",
  accountTypeChecker("eventPlanner"),
  Controllers.eventPlanner.eventController.createEvent
);

// Event Planner - Update event
// router.put(
//   //TODO - This is not yet implemented
//   "/:eventId",
//   accountTypeChecker("eventPlanner"),
//   Controllers.eventPlanner.eventController.updateEvent
// );

// Event Planner - Delete Event
// router.delete(
//   //TODO - This is not yet implemented
//   "/:eventId",
//   accountTypeChecker("eventPlanner"),
//   Controllers.eventPlanner.eventController.deleteEvent
// );

module.exports = router;
