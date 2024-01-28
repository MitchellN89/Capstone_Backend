// socketService.js
const socketIO = require("socket.io");
const dayjs = require("dayjs");
const Models = require("../models");

const DOMAIN = process.env.DOMAIN;

class SocketServices {
  #usersOnline = [];

  constructor(server) {
    this.io = socketIO(server, { cors: { origin: DOMAIN } });

    this.io.on("connection", (socket) => {
      socket.on("joinRoom", (roomId, userId) => {
        socket.join(roomId);
        this.addUserToUsersOnline(userId, socket.id);
        this.markDataBaseEntriesAsRead(userId, roomId); //TODO - Implement
      });

      socket.on("promoteVendor", async (roomId, properties, errorFunc) => {
        const { eventServiceId, senderId, recipientId } = properties;
        console.log(
          "__ __ promoteVendor: ",
          eventServiceId,
          senderId,
          recipientId
        );
        try {
          const result = await this.sendMessageToDataBase(
            "You have been promoted as vendor for this event service!",
            roomId,
            senderId,
            recipientId,
            true
          );

          console.log("__ __ result: ", result);

          const payload = {
            message: JSON.parse(JSON.stringify(result)),
            eventServiceId,
          };

          this.io.to(roomId).emit("promoteVendor", payload);
        } catch (err) {
          errorFunc(err.message);
        }
      });

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

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        this.removeUserFromUsersOnline(socket.id);
      });
    });
  }

  addUserToUsersOnline(userId, socketId) {
    this.#usersOnline.push({ userId, socketId });
    console.log("usersOnline AFTER ADD: ", this.#usersOnline);
  }

  removeUserFromUsersOnline(socketId) {
    this.#usersOnline = this.#usersOnline.filter(
      (user) => socketId != user.socketId
    );
    console.log("usersOnline AFTER REMOVE: ", this.#usersOnline);
  }

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

    console.log("DEBUG_createdAt: ", createdAt);
    console.log("DEBUG_message: ", message);
    console.log("DEBUG_messageRead: ", markAsRead);
    console.log("DEBUG_vendorEventConnectionId: ", vendorEventConnectionId);
    console.log("DEBUG_senderId: ", senderId);
    console.log("DEBUG_recipientId: ", recipientId);
    console.log("DEBUG_isServerMessage: ", isServerMessage);

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
