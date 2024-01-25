const { UserServices } = require("../services");
const { sendError } = require("./errorHandlerController");

const createUser = async (req, res) => {
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

module.exports = {
  createUser,
  loginWithCredentials,
};
