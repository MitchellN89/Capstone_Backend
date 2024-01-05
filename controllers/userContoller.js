const { UserServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const createUser = async (req, res) => {
  console.log("ACTION - createUser");
  const body = req.body;
  const userServices = new UserServices();

  try {
    const result = await userServices.checkExistsOrCreateUser(body);
    const { _conflict, response, data } = result;
    if (_conflict) {
      // conflict = true means the user already exists. tell the frontend that user exists and attempt to refer them to the login page.
      res.status(409).json({ response, data });
    } else {
      // if there is no conflict, the user didn't exist in the database and the userService has created a new one.
      res.status(200).json({ response, data });
    }
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const loginWithCredentials = async (req, res) => {
  console.log("ACTION - loginWithCredentials");
  const userServices = new UserServices();
  const body = req.body;

  try {
    const result = await userServices.loginWithCredentials(body);

    // the user not existing OR the credentials not matching will send the same error code back
    if (!result._userExists || !result._credentialsMatch) {
      res.status(404).json({ response: result.response });
    } else {
      // otherise respond with 200 and give back the data
      res.status(200).json({
        response: result.response,
        data: result.data,
        token: result.token,
      });
    }
  } catch (err) {
    sendError(err, "creating new event", res);
  }
};

const setVendorLocations = async (req, res) => {
  console.log("ACTION - setVendorLocations");
  const userServices = new UserServices();
  const { body, id: vendorId } = req;

  try {
    const result = await userServices.setVendorLocations(vendorId, body);
    // FIXME - change
    res.status(200).json(result);
  } catch (err) {
    sendError(err, "adding or removing locations from vendor", res);
  }
};

const setVendorServices = async (req, res) => {
  console.log("ACTION - setVendorServices");
  const userServices = new UserServices();
  const { body, id: vendorId } = req;

  try {
    const result = await userServices.setVendorServices(vendorId, body);

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "adding or removing services from vendor", res);
  }
};

const addBlackListedUser = async (req, res) => {
  console.log("ACTION - addBlackListedUser");
  const userServices = new UserServices();
  const { id: userId } = req;
  const targetId = req.params.vendorId || req.params.eventPlannerId;
  try {
    const result = await userServices.addOrRemoveBlackListedUser(
      userId,
      targetId,
      "add"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "adding user to blacklist", res);
  }
};

const removeBlackListedUser = async (req, res) => {
  console.log("ACTION - removeBlackListedUser");
  const userServices = new UserServices();
  const { id: userId } = req;
  const targetId = req.params.vendorId || req.params.eventPlannerId;
  try {
    const result = await userServices.addOrRemoveBlackListedUser(
      userId,
      targetId,
      "remove"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "removing user from blacklist", res);
  }
};

const addWhiteListedUser = async (req, res) => {
  console.log("ACTION - addWhiteListedUser");
  const userServices = new UserServices();
  const { id: userId } = req;
  const targetId = req.params.vendorId || req.params.eventPlannerId;
  try {
    const result = await userServices.addOrRemoveWhiteListedUser(
      userId,
      targetId,
      "add"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "adding user to whitelist", res);
  }
};

const removeWhiteListedUser = async (req, res) => {
  console.log("ACTION - removeWhiteListedUser");
  const userServices = new UserServices();
  const { id: userId } = req;
  const targetId = req.params.vendorId || req.params.eventPlannerId;
  try {
    const result = await userServices.addOrRemoveWhiteListedUser(
      userId,
      targetId,
      "remove"
    );

    res.status(200).json(result);
  } catch (err) {
    sendError(err, "removing user from whitelist", res);
  }
};

module.exports = {
  createUser,
  loginWithCredentials,
  setVendorLocations,
  setVendorServices,
  addBlackListedUser,
  removeBlackListedUser,
  addWhiteListedUser,
  removeWhiteListedUser,
};
