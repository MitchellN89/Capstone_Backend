const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Get Vendors (for EventPlanners)
router.get("/");

// Get Vendor (for EventPlanenrs)
router.get("/:vendorId");

// Add Blacklist Vendor (for EP)
router.post(
  "/:vendorId/blacklist/add",
  Controllers.userController.addBlackListedUser
);

// Remove Blacklist Vendor (for EP)
router.post(
  "/:vendorId/blacklist/remove",
  Controllers.userController.removeBlackListedUser
);

// Add WhiteList Vendor (for EP)
router.post(
  "/:vendorId/whitelist/add",
  Controllers.userController.addWhiteListedUser
);

// Remove WhiteList Vendor (for EP)
router.post(
  "/:vendorId/whitelist/remove",
  Controllers.userController.removeWhiteListedUser
);

module.exports = router;
