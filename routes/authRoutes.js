const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

router.post("/createuser", Controllers.userController.createUser);

router.post(
  "/loginwithcredentials",
  Controllers.userController.loginWithCredentials
);

module.exports = router;
