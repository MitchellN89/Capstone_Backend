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
    sendInternalServerError(err, "creating new event", res);
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
      // otherise respond with 200 and give back the data
      res.status(200).send({ response: result.response, data: result.data });
    }
  } catch (err) {
    sendInternalServerError(err, "creating new event", res);
  }
};

const sendInternalServerError = (err, errorWhile, res) => {
  console.log(`Error while ${errorWhile}`, err);
  res
    .status(500)
    .send({ response: "Internal Server Error", error: err.message });
};

module.exports = { createUser, loginWithCredentials };
