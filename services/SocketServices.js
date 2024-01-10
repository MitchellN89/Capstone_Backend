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
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", (roomId, userId) => {
        socket.join(roomId);
        this.addUserToUsersOnline(userId, socket.id);
        this.markDataBaseEntriesAsRead(userId, roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on("promoteVendor", (roomId, payload) => {
        console.log("PROMOTE", roomId, payload);
        this.io.to(roomId).emit("promoteVendor", payload);
      });

      socket.on("payloadFromUser", (roomId, payload) => {
        const createdAt = dayjs();
        this.io.to(roomId).emit("payloadFromServer", { ...payload, createdAt });

        const markAsRead = this.#usersOnline.some(
          (onlineUser) => onlineUser.userId == payload.recipientId
        );

        const { senderId, recipientId, message } = payload;

        this.sendToDataBase(
          createdAt,
          message,
          markAsRead,
          roomId,
          senderId,
          recipientId
        );
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
    try {
      Models.ChatEntry.update(
        { messageRead: true },
        { where: { recipientId, vendorEventConnectionId } }
      );
    } catch (err) {
      console.error(err);
    }
  }

  sendToDataBase(
    createdAt,
    message,
    messageRead,
    vendorEventConnectionId,
    senderId,
    recipientId
  ) {
    try {
      Models.ChatEntry.create({
        createdAt,
        message,
        messageRead,
        vendorEventConnectionId,
        senderId,
        recipientId,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = SocketServices;
