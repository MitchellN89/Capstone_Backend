const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Get EPs (for Vendor)
router.get("/");

// Get EP (for Vendor)
router.get("/:eventPlannerId");

// Toggle Blacklist EP (for Vendor)
router.post("/:eventPlannerId/blacklist/add");

// Toggle Blacklist EP (for Vendor)
router.post("/:eventPlannerId/blacklist/remove");

// Toggle WhiteList EP (for Vendor)
router.post("/:eventPlannerId/whitelist/add");

// Toggle WhiteList EP (for Vendor)
router.post("/:eventPlannerId/whitelist/remove");

module.exports = router;
