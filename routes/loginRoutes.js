const express = require("express");
const router = express.Router();

const Contorllers = require("../controllers");

router.post("/createuser", Contorllers.userController.createUser);

router.post("/", Contorllers.userController.login);

module.exports = router;
