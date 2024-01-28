const Models = require("../models");

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
