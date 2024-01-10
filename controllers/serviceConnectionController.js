const { EventServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const getOneBlindVendorServiceConnection = async (req, res) => {
  const eventServices = new EventServices();
  const { id: vendorId } = req;
  const { serviceRequestId } = req.params;

  try {
    const result = await eventServices.getOneBlindVendorServiceConnection(
      vendorId,
      serviceRequestId
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "getting one vendor service connection", res);
  }
};

const acceptEventServiceOffer = async (req, res) => {
  const eventServices = new EventServices();
  const { serviceConnectionId } = req.params;
  try {
    const result = await eventServices.acceptEventServiceOffer(
      serviceConnectionId
    );

    if (!result.count) {
      return res.status(500).json({
        response: "An error has occurred during accepting event service offer",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "accepting event service offer", res);
  }
};

module.exports = {
  getOneBlindVendorServiceConnection,
  acceptEventServiceOffer,
};
