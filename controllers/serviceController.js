const { ServiceServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getServices = async (req, res) => {
  const serviceServices = new ServiceServices();
  try {
    const result = await serviceServices.getServices();

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting services", res);
  }
};

module.exports = { getServices };
