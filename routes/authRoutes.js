const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Create user account
router.post("/createuser", Controllers.userController.createUser);

// Login to account
router.post(
  "/loginwithcredentials",
  Controllers.userController.loginWithCredentials
);

module.exports = router;
