const { EventServices } = require("../services");

const uploadFile = require("../utilities/ImageUpload");
const { sendError } = require("./errorHandlerController");

// Controller functions below all share the same behaviour.
// In the controller function, I destructure and create variable to hold info that needs to be passed into the services class objects.
// class object instances are created in each function.

// after having the service class object attempt to manipulate the database, on success, the data is returned to the front end.
// on error, sendError function is called as a modular way to handle errors and return the error to the front end

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
  } catch (err) {
    sendError(err, "creating new event", res);
  }

};

const createEvent = async (req, res) => {
  const { id, body } = req;
  const { imageUpload } = body;
  const eventServices = new EventServices();

  try {
    const result = await eventServices.createEvent(id, body);

    const { id: eventId } = result.data;

    // here, I'm calling the uploadFile function. This allows me to pass the base64 string along with the eventId.
    // the function uses nodeJs 'fs' library to write the file to the uploads folder
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

    // here, I'm calling the uploadFile function. This allows me to pass the base64 string along with the eventId.
    // the function uses nodeJs 'fs' library to write the file to the uploads folder
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
  getVendorEvent,
};
