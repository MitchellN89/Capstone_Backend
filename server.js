const express = require("express");
const app = express();
const { tokenChecker } = require("./middleware");
// I've created tokenChecker middleware to reject incoming requests (excl auth paths) that don't have a valid token

require("dotenv").config();
const dbConnect = require("./dbConnect");

const { authRoutes, eventRoutes } = require("./routes");
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/auth", authRoutes); //I've not used tokenChecker on this route as this API calls sent to this route are not expected to have a token yet

app.use("/events", tokenChecker, eventRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
