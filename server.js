const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./dbConnect");
const Models = require("./models");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ result: "You've made it to the root route" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
