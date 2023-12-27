const express = require("express");
const app = express();
const { authRoutes } = require("./routes");

require("dotenv").config();
const dbConnect = require("./dbConnect");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/auth", authRoutes);

const { tokenChecker } = require("./middleware");
app.post("/token", tokenChecker, (req, res) => {
  const body = req.body;
  res.send({ response: "Token must have been ok!", body: body });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
