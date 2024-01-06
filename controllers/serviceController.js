const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getServices = async (req, res) => {
  const eventServices = new EventServices();
  try {
    const result = await eventServices.getServices();

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting services", res);
  }
};

module.exports = { getServices };
