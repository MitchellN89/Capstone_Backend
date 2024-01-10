const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getEventServices = async (req, res) => {
  const eventServices = new EventServices();
  const { eventId, id: eventPlannerId } = req;
  try {
    const result = await eventServices.getEventServices(
      eventId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting event services", res);
  }
};

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
    const result = await eventServices.enableEventServiceBroadcast(
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
    const result = await eventServices.disableEventServiceBroadcast(
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

const promoteVendor = async (req, res) => {
  const eventServices = new EventServices();
  const { eventServiceId, vendorId } = req.params;
  try {
    const result = await eventServices.promoteVendor(vendorId, eventServiceId);

    if (!result.count) {
      return res
        .status(500)
        .json({ response: "Error during promoting vendor" });
    }

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "promoting vendor", res);
  }
};

module.exports = {
  createEventService,
  updateEventService,
  deleteEventService,
  enableBroadcast,
  disableBroadcast,
  getEventServices,
  promoteVendor,
};
