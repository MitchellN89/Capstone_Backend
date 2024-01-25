// // These routes are for users to interact with thier OWN data only.

// const express = require("express");
// const router = express.Router();
// const { accountTypeChecker } = require("../middleware");
// const Conrollers = require("../controllers");

// // Add or remove multiple location preferences
// router.post(
//   "/adjust_vendor_locations",
//   accountTypeChecker("vendor"),
//   Conrollers.userController.setVendorLocations
// );

// // Add or remove multiple services
// router.post(
//   "/adjust_vendor_services",
//   accountTypeChecker("vendor"),
//   Conrollers.userController.setVendorServices
// );

// // TODO options here to set Blacklist and Whitelist straight from the account?

// module.exports = router;
