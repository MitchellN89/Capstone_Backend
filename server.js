const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http");
const { accountTypeChecker } = require("./middleware"); //TODO - Possibly move this over to server.js
const { tokenChecker } = require("./middleware");
// I've created tokenChecker middleware to reject incoming requests (excl auth paths) that don't have a valid token

require("dotenv").config();
const dbConnect = require("./dbConnect");

const { SocketServices } = require("./services");
const server = http.createServer(app);

const socketServices = new SocketServices(server);

app.use(cors());

const {
  authRoutes,
  eventRoutes,
  serviceRoutes,
  eventServiceRoutes,
} = require("./routes");
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "3mb" }));

app.use("/uploads", express.static("./uploads"));

app.use("/auth", authRoutes); //I've not used tokenChecker on this route as this API calls sent to this route are not expected to have a token yet
app.use("/events", tokenChecker, eventRoutes);

app.use("/services", tokenChecker, serviceRoutes);
app.use(
  "/serviceRequests",
  tokenChecker,
  accountTypeChecker("vendor"),
  eventServiceRoutes
);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
