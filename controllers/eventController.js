const { EventServices } = require("../services");
const uploadFile = require("../utilities/Tesseract");
const { sendError } = require("./errorHandlerController");

// COMEBACKTO - Consider removing these? are they redundant??
const getEventPlannerEvents = async (req, res) => {
  const { id } = req;
  const eventServices = new EventServices();
  try {
    const result = await eventServices.getEventPlannerEvents(id);
    res.status(200).json(result);
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const getVendorEvents = async (req, res) => {
  const { id: vendorId } = req;
  const eventServices = new EventServices();

  try {
    const result = await eventServices.getVendorEvents(vendorId);
    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting vendor events", res);
  }
};

const getVendorEvent = async (req, res) => {
  const { id: vendorId, eventId: eventServiceId } = req;
  const eventServices = new EventServices();

  try {
    const result = await eventServices.getVendorEvent(vendorId, eventServiceId);
    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting vendor event", res);
  }
};

const getEventPlannerEvent = async (req, res) => {
  const { id } = req;
  const { eventId } = req.params;
  const eventServices = new EventServices();

  try {
    const result = await eventServices.getEventPlannerEvent(id, eventId);

    if (!result.data) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {}
};

const createEvent = async (req, res) => {
  const { id, body } = req;
  const { imageUpload } = body;
  const eventServices = new EventServices();

  try {
    const result = await eventServices.createEvent(id, body);
    console.log("EVENT CREATE: ", result);
    const { id: eventId } = result.data;

    if (imageUpload) {
      await uploadFile(imageUpload, `event${eventId}`, "events");
    }

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const updateEvent = async (req, res) => {
  const eventServices = new EventServices();
  const { id, body } = req;
  const { eventId } = req.params;
  const { imageUpload } = body;

  try {
    const result = await eventServices.updateEvent(eventId, id, body);

    if (imageUpload) {
      await uploadFile(imageUpload, `event${eventId}`, "events");
    }

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

module.exports = {
  getEventPlannerEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventPlannerEvent,
  getVendorEvents,
  getVendorEvent,
};
