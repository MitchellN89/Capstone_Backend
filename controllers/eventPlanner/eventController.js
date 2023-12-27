const { EventServices } = require("../../services");

const getEvents = async (req, res) => {
  const { id } = req;
  const eventServices = new EventServices();
  try {
    const result = await eventServices.getAllEventPlannerEvents(id);

    if (!result.count) {
      return res.status(404).send(result);
    }

    res.status(200).send(result);
  } catch (err) {
    sendInternalServerError(err, "creating new event", res);
  }
};

const createEvent = async (req, res) => {
  const { id, body } = req;
  const eventServices = new EventServices();
  try {
    const result = await eventServices.createEvent(id, body);

    res.status(200).send(result);
  } catch (err) {
    sendInternalServerError(err, "creating new event", res);
  }
};

const updateEvent = async (req, res) => {
  const eventServices = new EventServices();
  const { id, body } = req;
  const { eventId } = req.params;

  try {
    const result = await eventServices.updateEvent(eventId, id, body);

    res.status(200).send(result);
  } catch (err) {
    sendInternalServerError(err, "updating event", res);
  }
};

const deleteEvent = async (req, res) => {
  const eventServices = new EventServices();
  const { id } = req;
  const { eventId } = req.params;

  try {
    const result = await eventServices.deleteEvent(eventId, id);

    res.status(200).send(result);
  } catch (err) {
    sendInternalServerError(err, "updating event", res);
  }
};

const sendInternalServerError = (err, errorWhile, res) => {
  console.log(`Error while ${errorWhile}`, err);
  res
    .status(500)
    .send({ response: "Internal Server Error", error: err.message });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
