const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getBroadcastEvents = async (req, res) => {
  const eventServices = new EventServices();

  try {
    const result = await eventServices.getEventBroadcasts();

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting event broadcasts", res);
  }
};

const connectToBroadcast = async (req, res) => {
  const eventServices = new EventServices();
  const { broadcastId: eventServiceId } = req.params;
  const { id: vendorId } = req;
  const { vendorResponse } = req.body;

  try {
    const result = await eventServices.connectToBroadcast(
      eventServiceId,
      vendorId,
      vendorResponse
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "connecting to event broadcast", res);
  }
};

const updateEventPlannerEventBroadcastConnectionStatus = async (req, res) => {
  const eventServices = new EventServices();
  const { broadcastId: eventServiceId } = req.params;
  const { id: eventPlannerId } = req;
  const { clientResponse } = req.body;

  try {
    const result =
      await eventServices.updateEventPlannerEventBroadcastConnectionStatus(
        eventServiceId,
        eventPlannerId,
        clientResponse
      );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "updating client response in event broadcast", res);
  }
};

module.exports = {
  getBroadcastEvents,
  connectToBroadcast,
  updateEventPlannerEventBroadcastConnectionStatus,
};
