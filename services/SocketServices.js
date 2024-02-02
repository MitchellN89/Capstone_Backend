// socketService.js
const socketIO = require("socket.io");
const dayjs = require("dayjs");
const Models = require("../models");

// get domain from .env file
// this is used to set up cors allowances with socketIO
const DOMAIN = process.env.DOMAIN;

class SocketServices {
  #usersOnline = [];

  constructor(server) {
    // takes the http server passed in and creates a new socketio connection while also allowing the frontend to access it
    this.io = socketIO(server, { cors: { origin: DOMAIN } });

    // set up listeners
    this.io.on("connection", (socket) => {
      // this fires when a user joins a room.
      // socket io associates the user with that room id
      // I am also adding the user to an online array to track whether they are online when messages are sent to them
      // this means i can set whether the message is "read" or not
      socket.on("joinRoom", (roomId, userId) => {
        socket.join(roomId);
        this.addUserToUsersOnline(userId, socket.id);

        // this makes a db manipulation and marks all messages from the given room as read for the given user
        this.markDataBaseEntriesAsRead(userId, roomId); //TODO - Implement
      });

      // when promoteVendor message comes through, a message is sent to the database and also emitted to the vendor who is being promoted
      socket.on("promoteVendor", async (roomId, properties, errorFunc) => {
        const { eventServiceId, senderId, recipientId } = properties;

        try {
          const result = await this.sendMessageToDataBase(
            "You have been promoted as vendor for this event service!",
            roomId,
            senderId,
            recipientId,
            true
          );

          // the JSON.parse(JSON.stringify(result)) is forcing the sequelize object to flatten out to a plain js object.
          // sequelize objects have a lot of extra data attached that i don't want to send back in the payload
          const payload = {
            message: JSON.parse(JSON.stringify(result)),
            eventServiceId,
          };

          this.io.to(roomId).emit("promoteVendor", payload);
        } catch (err) {
          errorFunc(err.message);
        }
      });

      // simple handling of receiving a message from a user and sending it to the correct room
      // this also manipulates the db to add a chat message
      socket.on("payloadFromUser", async (roomId, payload, errorFunc) => {
        const { senderId, recipientId, message } = payload;

        try {
          const result = await this.sendMessageToDataBase(
            message,
            roomId,
            senderId,
            recipientId
          );
          this.io
            .to(roomId)
            .emit("payloadFromServer", JSON.parse(JSON.stringify(result)));
        } catch (err) {
          console.error(err);
          errorFunc(err.message);
        }
      });

      // when a user disconnects, remove them from online state
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        this.removeUserFromUsersOnline(socket.id);
      });
    });
  }

  // function adds the user to being online
  addUserToUsersOnline(userId, socketId) {
    this.#usersOnline.push({ userId, socketId });
  }

  // function filters through the online users and removes a user from it
  removeUserFromUsersOnline(socketId) {
    this.#usersOnline = this.#usersOnline.filter(
      (user) => socketId != user.socketId
    );
    console.log("usersOnline AFTER REMOVE: ", this.#usersOnline);
  }

  // manipulates the database to mark messages as read
  markDataBaseEntriesAsRead(recipientId, vendorEventConnectionId) {
    console.log("recipientId: ", recipientId);
    console.log("vendorEventConnectionId: ", vendorEventConnectionId);
    try {
      Models.ChatEntry.update(
        { messageRead: true },
        { where: { recipientId, vendorEventConnectionId } }
      );
    } catch (err) {
      console.error(err);
    }
  }

  // manipulates the database to create new chat messages
  sendMessageToDataBase(
    message,
    vendorEventConnectionId,
    senderId,
    recipientId,
    isServerMessage = false
  ) {
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("DATE: ", createdAt);

    const markAsRead = this.#usersOnline.some(
      (onlineUser) => onlineUser.userId == recipientId
    );

    return Models.ChatEntry.create({
      createdAt,
      message,
      messageRead: markAsRead,
      vendorEventConnectionId,
      senderId,
      recipientId,
      isServerMessage,
    });
  }
}

module.exports = SocketServices;
