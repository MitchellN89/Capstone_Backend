const { UserServices } = require("../services");

const createUser = async (req, res) => {
  const body = req.body;
  const userServices = new UserServices();

  try {
    const result = await userServices.checkAndCreateUser(body);
    const { conflict, response, data } = result;
    if (conflict) {
      // conflict = true means the user already exists. tell the frontend that user exists and attempt to refer them to the login page.
      res.status(409).send({ response, data });
    } else {
      // if there is no conflict, the user didn't exist in the database and the userService has created a new one.
      res.status(200).send({ response, data });
    }
  } catch (err) {
    // Expected errors here may be fields cannot be null, this should be handled on the front end to ensure requests like that don't make it to the backend.
    console.log("Error while checking for existing user ", err);
    res
      .status(500)
      .send({ response: "Internal server error", error: err.message });
  }
};

const loginWithCredentials = async (req, res) => {
  const userServices = new UserServices();
  const body = req.body;

  try {
    const result = await userServices.loginWithCredentials(body);

    // the user not existing OR the credentials not matching will send the same error code back
    if (!result.userExists || !result.credentialsMatch) {
      res.status(404).send({ response: result.response });
    } else {
      res.status(200).send({ response: result.response, data: result.data });
    }
  } catch (err) {
    res
      .status(500)
      .send({ response: "Internal server error", error: err.message });
  }
};

module.exports = { createUser, loginWithCredentials };
