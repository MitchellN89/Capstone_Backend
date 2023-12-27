const { EventServices } = require("../../services");

const getAllEvents = async (req, res) => {
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
  console.log(id, body);
  const eventServices = new EventServices();
  try {
    const result = await eventServices.createEvent(id, body);

    res.status(200).send(result);
  } catch (err) {
    sendInternalServerError(err, "creating new event", res);
  }
};

const updateEvent = (req, res) => {};
const deleteEvent = (req, res) => {};
const toggleBroadcast = (req, res) => {};

const sendInternalServerError = (err, errorWhile, res) => {
  console.log(`Error while ${errorWhile}`, err);
  res
    .status(500)
    .send({ response: "Internal Server Error", error: err.message });
};

module.exports = { getAllEvents, createEvent };
