const express = require("express");
const app = express();
const cors = require("cors");
const { accountTypeChecker } = require("./middleware"); //TODO - Possibly move this over to server.js
const { tokenChecker } = require("./middleware");
// I've created tokenChecker middleware to reject incoming requests (excl auth paths) that don't have a valid token

require("dotenv").config();
const dbConnect = require("./dbConnect");

app.use(cors());

const {
  authRoutes,
  eventRoutes,
  vendorRoutes,
  accountRoutes,
  eventPlannerRoutes,
} = require("./routes");
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/auth", authRoutes); //I've not used tokenChecker on this route as this API calls sent to this route are not expected to have a token yet
app.use("/events", tokenChecker, eventRoutes);
app.use(
  "/vendors",
  tokenChecker,
  accountTypeChecker("eventPlanner"),
  vendorRoutes
);
app.use(
  "/eventplanners",
  tokenChecker,
  accountTypeChecker("vendor"),
  eventPlannerRoutes
);
app.use("/account", tokenChecker, accountRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
