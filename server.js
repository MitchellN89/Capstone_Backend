const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http");
// Middleware to reject or allow certain account types
const { accountTypeChecker } = require("./middleware");

// Middleware to reject incoming requests (excl auth paths) that don't have a valid token
const { tokenChecker } = require("./middleware");

// get environment variable
require("dotenv").config();

// setup connection to mysql
const dbConnect = require("./dbConnect");

// import my Socket class logic
const { SocketServices } = require("./services");

//create a new http server using app as the basis. this is to enable to ability to use socket.io
const server = http.createServer(app);

// create new instance of the SocketServices class
const socketServices = new SocketServices(server);

// use cors to allow incoming reqs NOT from origin
app.use(cors());

// my routes below
const {
  authRoutes,
  eventRoutes,
  serviceRoutes,
  eventServiceRoutes,
  chatRoutes,
} = require("./routes");

// set port as per .env file
const PORT = process.env.PORT || 8000;

// setup express to receive json with a 3mb limit (for images)
app.use(express.json({ limit: "3mb" }));

// set up static served folded for event images
app.use("/uploads", express.static("./uploads"));

// route paths below
// some use tokenChecker, this means if the user doesn't have a valid token, they cannot access the api end points
app.use("/auth", authRoutes); //I've not used tokenChecker on this route as this API calls sent to this route are not expected to have a token yet
app.use("/events", tokenChecker, eventRoutes);
app.use("/services", tokenChecker, serviceRoutes);
// the below uses accountTypeChecker. In this instance, it means only accounts who are vendors can access the api end points
app.use(
  "/serviceRequests",
  tokenChecker,
  accountTypeChecker("vendor"),
  eventServiceRoutes
);
app.use("/chatentries", tokenChecker, chatRoutes);

// run the server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
