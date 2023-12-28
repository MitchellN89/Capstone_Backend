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
    console.log("GOT after the updateEventServiceWithUserCheck");
    const { _userIsAuthorised, response, count } = result;

    if (!_userIsAuthorised) {
      return res.status(401).json({ response });
    }

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

    const { _userIsAuthorised, response, count } = result;

    if (!_userIsAuthorised) {
      return res.status(401).json({ response });
    }

    res.status(200).json({ response, count });
  } catch (err) {
    sendError(err, "deleting event service", res);
  }
};

const toggleBroadcast = (req, res) => {};

module.exports = { createEventService, updateEventService, deleteEventService };
