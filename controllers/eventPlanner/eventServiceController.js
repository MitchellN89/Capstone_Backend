const { EventServices } = require("../../services");
const { sendError } = require("../errorHandlerController");

const createEventService = async (req, res) => {
  const eventServices = new EventServices();
  const { body, eventId, id: eventPlannerId } = req;
  try {
    const result = await eventServices.createEventServiceWithUserCheck(
      eventId,
      eventPlannerId,
      body
    );
    const { _userIsAuthorised, response, data } = result;

    if (!_userIsAuthorised) {
      return res.status(401).json({ response });
    }

    res.status(200).json({ response, data });
  } catch (err) {
    sendError(err, "creating event service", res);
  }
};

const updateEventService = async (req, res) => {
  const eventServices = new EventServices();
  const { body, eventId, id: eventPlannerId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServices.updateEventServiceWithUserCheck(
      eventId,
      eventServiceId,
      eventPlannerId,
      body
    );

    const { response, count } = result;

    res.status(200).json({ response, count });
  } catch (err) {
    sendError(err, "updating event service", res);
  }
};

const deleteEventService = async (req, res) => {
  const eventServices = new EventServices();
  const { eventId, id: eventPlannerId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServices.deleteEventServiceWithUserCheck(
      eventId,
      eventServiceId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "deleting event service", res);
  }
};

const enableBroadcast = async (req, res) => {
  const eventServices = new EventServices();
  const { eventId, id: eventPlannerId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServices.changeEventServiceBroadcast(
      eventId,
      eventServiceId,
      eventPlannerId,
      "enable"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "enabling event service broadcast", res);
  }
};

const disableBroadcast = async (req, res) => {
  const eventServices = new EventServices();
  const { eventId, id: eventPlannerId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServices.changeEventServiceBroadcast(
      eventId,
      eventServiceId,
      eventPlannerId,
      "disable"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "enabling event service broadcast", res);
  }
};

module.exports = {
  createEventService,
  updateEventService,
  deleteEventService,
  enableBroadcast,
  disableBroadcast,
};
