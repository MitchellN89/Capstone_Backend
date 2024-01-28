const { EventServiceConnectionServices } = require("../services");
const { sendError } = require("./errorHandlerController");
const dayjs = require("dayjs");

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

  const { vendorStatus, message, eventPlannerId } = req.body;
  const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log("DATE: ", createdAt);

  try {
    const result = await eventServiceConnectionServices.connectToServiceRequest(
      eventServiceId,
      vendorId,
      vendorStatus,
      message,
      createdAt,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "connecting to event broadcast", res);
  }
};

module.exports = {
  getOneBlindVendorServiceConnection,
  getServiceConnections,
  getOneServiceConnectionByVendorId,
  getOneServiceRequest,
  connectToServiceRequest,
};
