const express = require("express");
const router = express.Router();

// I've made some middleware which checks for the accountType. This means if the user is not the correct type, it stops them from using APIs they aren't authorised to use...
const { accountTypeChecker } = require("../middleware");

router.get("/", (req, res) => {
  const { accountType } = req;

  switch (accountType) {
    case "eventPlanner":
      break;
    case "vendor":
    // TODO not implemented
  }
});

// Event Planner - Create new service
router.post("/");

// Event Planner - Update service
router.put("/");

// Event Planner - Delete service
router.delete("/");

// Event Planner - Toggle Broadcast
router.patch("/");

module.exports = router;
