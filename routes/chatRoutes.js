const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Get unread messages
router.get("/", Controllers.chatController.getOustandingChatEntries);

module.exports = router;
