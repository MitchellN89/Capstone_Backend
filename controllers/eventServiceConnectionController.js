const { EventServiceConnectionServices } = require("../services");
const { sendError } = require("./errorHandlerController");
const dayjs = require("dayjs");

// Controller functions below all share the same behaviour.
// In the controller function, I destructure and create variable to hold info that needs to be passed into the services class objects.
// class object instances are created in each function.

// after having the service class object attempt to manipulate the database, on success, the data is returned to the front end.
// on error, sendError function is called as a modular way to handle errors and return the error to the front end

const getOneBlindVendorServiceConnection = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { id: vendorId } = req;
  const { eventServiceId } = req.params;

  try {
    const result =
      await eventServiceConnectionServices.getOneBlindVendorServiceConnection(
        vendorId,
        eventServiceId
      );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one vendor service connection", res);
  }
};

// Event Planner - Get service connections
const getServiceConnections = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { id: eventPlannerId, eventServiceId } = req;

  try {
    const result = await eventServiceConnectionServices.getServiceConnections(
      eventServiceId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting service connections", res);
  }
};

const getOneServiceConnectionByVendorId = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { vendorId } = req.params;
  const { id: eventPlannerId, eventServiceId } = req;

  try {
    const result =
      await eventServiceConnectionServices.getOneServiceConnectionByVendorId(
        vendorId,
        eventServiceId,
        eventPlannerId
      );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one service connection");
  }
};

const getOneServiceRequest = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { id: vendorId } = req;
  const { eventServiceId } = req.params;

  try {
    const result = await eventServiceConnectionServices.getOneServiceRequest(
      eventServiceId,
      vendorId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one event request", res);
  }
};

const connectToServiceRequest = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { eventServiceId } = req.params;
  const { id: vendorId } = req;

  const { message, eventPlannerId } = req.body;
  // this creates the current time formatted for mysql insertion
  const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

  try {
    const result = await eventServiceConnectionServices.connectToServiceRequest(
      eventServiceId,
      vendorId,
      message,
      createdAt,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "connecting to event broadcast", res);
  }
};

const ignoreServiceRequest = async (req, res) => {
  const eventServiceConnectionServices = new EventServiceConnectionServices();
  const { eventServiceId } = req.params;
  const { id: vendorId } = req;

  try {
    const result = await eventServiceConnectionServices.ignoreServiceRequest(
      eventServiceId,
      vendorId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "ignoring event broadcast", res);
  }
};

module.exports = {
  getOneBlindVendorServiceConnection,
  getServiceConnections,
  getOneServiceConnectionByVendorId,
  getOneServiceRequest,
  connectToServiceRequest,
  ignoreServiceRequest,
};
