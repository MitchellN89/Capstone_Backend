const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Get EPs (for Vendor)
router.get("/");

// Get EP (for Vendor)
router.get("/:eventPlannerId");

// Add Blacklist EP (for Vendor)
router.post(
  "/:eventPlannerId/blacklist/add",
  Controllers.userController.addBlackListedUser
);

// Remove Blacklist EP (for Vendor)
router.post(
  "/:eventPlannerId/blacklist/remove",
  Controllers.userController.removeBlackListedUser
);

// Add WhiteList EP (for Vendor)
router.post(
  "/:eventPlannerId/whitelist/add",
  Controllers.userController.addWhiteListedUser
);

// Remove WhiteList EP (for Vendor)
router.post(
  "/:eventPlannerId/whitelist/remove",
  Controllers.userController.removeWhiteListedUser
);

module.exports = router;
