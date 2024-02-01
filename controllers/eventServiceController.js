const { EventServiceServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getEventPlannerEventServices = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { eventId, id: eventPlannerId } = req;
  try {
    const result = await eventServiceServices.getEventPlannerEventServices(
      eventId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting event services", res);
  }
};

const getServiceRequests = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { id: vendorId } = req;
  try {
    const result = await eventServiceServices.getServiceRequests(vendorId);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting event requests", res);
  }
};

const getVendorEventServices = async (req, res) => {
  const { id: vendorId } = req;
  const eventServiceServices = new EventServiceServices();

  try {
    const result = await eventServiceServices.getVendorEvents(vendorId);
    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting vendor events", res);
  }
};

const createEventService = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { body, eventId } = req;
  try {
    const result = await eventServiceServices.createEventService(eventId, body);
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
  const eventServiceServices = new EventServiceServices();
  const { body, eventId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServiceServices.updateEventService(
      eventId,
      eventServiceId,
      body
    );

    const { response, count } = result;

    res.status(200).json({ response, count });
  } catch (err) {
    sendError(err, "updating event service", res);
  }
};

const deleteEventService = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { eventServiceId } = req.params;

  try {
    const result = await eventServiceServices.deleteEventService(
      eventServiceId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "deleting event service", res);
  }
};

const enableBroadcast = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { eventServiceId } = req.params;

  try {
    const result = await eventServiceServices.enableEventServiceBroadcast(
      eventServiceId,
      "enable"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "enabling event service broadcast", res);
  }
};

const promoteVendor = async (req, res) => {
  const eventServiceServices = new EventServiceServices();
  const { vendorId } = req.params;
  const { eventServiceId } = req;
  try {
    const result = await eventServiceServices.promoteVendor(
      vendorId,
      eventServiceId
    );

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
  getServiceRequests,
  createEventService,
  updateEventService,
  deleteEventService,
  enableBroadcast,
  // disableBroadcast,
  getEventPlannerEventServices,
  promoteVendor,
  getVendorEventServices,
};
