const express = require("express");
const router = express.Router();
const eventServiceConnectionRoutes = require("./eventEventServiceConnectionRoutes");
const Controllers = require("../controllers");

// Event Planner - Get event services
router.get(
  "/",
  Controllers.eventServiceController.getEventPlannerEventServices
);

// Event Planner - Create new service
router.post("/", Controllers.eventServiceController.createEventService);

// Event Planner - Update service
router.put(
  "/:eventServiceId",
  Controllers.eventServiceController.updateEventService
);

// Event Planner - Delete service
router.delete(
  "/:eventServiceId",
  Controllers.eventServiceController.deleteEventService
);

// Event Planner - Enable Broadcast
router.patch(
  "/:eventServiceId/broadcast/enable",
  Controllers.eventServiceController.enableBroadcast
);

// this middleware will take the params in the path from below and will pass the eventServiceId into the req so it can be picked up further down the route chain
router.param("eventServiceId", (req, res, next, eventServiceId) => {
  req.eventServiceId = eventServiceId;
  next();
});

// Chaining on eventServices routes
router.use("/:eventServiceId/connections", eventServiceConnectionRoutes);

module.exports = router;
