const Models = require("../models");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)
class ChatServices {
  async getOutstandingChatEntries(userId) {
    const results = await Models.ChatEntry.findAll({
      where: {
        recipientId: userId,
        messageRead: false,
      },
      include: [
        {
          model: Models.VendorEventConnection,
          attributes: ["id"],
          include: [
            {
              model: Models.EventService,
              attributes: ["id"],
              include: [{ model: Models.Event, attributes: ["id"] }],
            },
          ],
        },
      ],
    });

    const count = results.length;

    return {
      response: `${count} outstanding chat entries found`,
      count,
      data: results,
    };
  }
}

module.exports = ChatServices;
