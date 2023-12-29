const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

// COMEBACKTO - Consider removing these? are they redundant??
const getEventPlannerEvents = async (req, res) => {
  const { id } = req;
  const eventServices = new EventServices();
  try {
    const result = await eventServices.getEventPlannerEvents(id);

    if (!result.count) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const createEvent = async (req, res) => {
  const { id, body } = req;
  const eventServices = new EventServices();
  try {
    const result = await eventServices.createEvent(id, body);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const updateEvent = async (req, res) => {
  const eventServices = new EventServices();
  const { id, body } = req;
  const { eventId } = req.params;

  try {
    const result = await eventServices.updateEvent(eventId, id, body);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "updating event", res);
  }
};

const deleteEvent = async (req, res) => {
  const eventServices = new EventServices();
  const { id } = req;
  const { eventId } = req.params;

  try {
    const result = await eventServices.deleteEvent(eventId, id);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "updating event", res);
  }
};

const getBroadcastEvents = async (req, res) => {
  console.log("Making it to the controller");
  const eventServices = new EventServices();
  const result = await eventServices.getEventBroadcasts();

  res.status(200).json(result);
};

const connectToBroadcast = async (req, res) => {};

module.exports = {
  getEventPlannerEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getBroadcastEvents,
};
