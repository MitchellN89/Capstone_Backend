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
  const { vendorStatus, message } = req.body;

  try {
    const result = await eventServices.connectToServiceRequest(
      eventServiceId,
      vendorId,
      vendorStatus,
      message
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
};
