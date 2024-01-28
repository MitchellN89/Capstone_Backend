const { ChatServices } = require("../services");
const { sendError } = require("./errorHandlerController");

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
