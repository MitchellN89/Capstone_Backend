const { ChatServices } = require("../services");
const { sendError } = require("./errorHandlerController");

// Controller functions below all share the same behaviour.
// In the controller function, I destructure and create variable to hold info that needs to be passed into the services class objects.
// class object instances are created in each function.

// after having the service class object attempt to manipulate the database, on success, the data is returned to the front end.
// on error, sendError function is called as a modular way to handle errors and return the error to the front end

const getOustandingChatEntries = async (req, res) => {
  const { id: userId } = req;
  const chatServices = new ChatServices();
  try {
    const result = await chatServices.getOutstandingChatEntries(userId);
    res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    sendError(err, "getting outstanding chat entries", res);
  }
};

module.exports = { getOustandingChatEntries };
