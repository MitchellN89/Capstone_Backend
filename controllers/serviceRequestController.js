const dayjs = require("dayjs");
const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getServiceRequests = async (req, res) => {
  const eventServices = new EventServices();

  try {
    const result = await eventServices.getServiceRequests();

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting event requests", res);
  }
};

const getOneServiceRequest = async (req, res) => {
  const eventServices = new EventServices();
  const { serviceRequestId } = req.params;

  try {
    const result = await eventServices.getOneServiceRequest(serviceRequestId);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one event request", res);
  }
};

const connectToServiceRequest = async (req, res) => {
  const eventServices = new EventServices();
  const { serviceRequestId: eventServiceId } = req.params;
  const { id: vendorId } = req;
  console.log("Body: ", req.body);
  const { vendorStatus, message, eventPlannerId } = req.body;
  const createdAt = dayjs();

  try {
    const result = await eventServices.connectToServiceRequest(
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

// Event Planner - Get service connections
const getServiceConnections = async (req, res) => {
  const eventServices = new EventServices();
  const { eventServiceId } = req.params;
  const { id: eventPlannerId } = req;
  try {
    const result = await eventServices.getServiceConnections(
      eventServiceId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting service connections", res);
  }
};

// const getOneServiceConnectionById = async (req, res) => {
//   const eventServices = new EventServices();
//   const { serviceConnectionId, eventServiceId } = req.params;
//   const { id: eventPlannerId } = req;

//   try {
//     const result = await eventServices.getOneServiceConnectionById(
//       serviceConnectionId,
//       eventServiceId,
//       eventPlannerId
//     );

//     res.status(200).json(result);
//   } catch (err) {
//     sendError(err, "getting one service connection");
//   }
// };

const getOneServiceConnectionByVendorId = async (req, res) => {
  const eventServices = new EventServices();
  const { vendorId, eventServiceId } = req.params;
  const { id: eventPlannerId } = req;

  try {
    const result = await eventServices.getOneServiceConnectionByVendorId(
      vendorId,
      eventServiceId,
      eventPlannerId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one service connection");
  }
};

// const updateEventPlannerEventBroadcastConnectionStatus = async (req, res) => {
//   const eventServices = new EventServices();
//   const { broadcastId: eventServiceId } = req.params;
//   const { id: eventPlannerId } = req;
//   const { clientResponse } = req.body;

//   try {
//     const result =
//       await eventServices.updateEventPlannerEventBroadcastConnectionStatus(
//         eventServiceId,
//         eventPlannerId,
//         clientResponse
//       );

//     res.status(200).json(result);
//   } catch (err) {
//     sendError(err, "updating client response in event broadcast", res);
//   }
// };

module.exports = {
  getServiceRequests,
  getOneServiceRequest,
  connectToServiceRequest,
  getServiceConnections,
  // getOneServiceConnectionById,
  getOneServiceConnectionByVendorId,
};
