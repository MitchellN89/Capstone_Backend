const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./dbConnect");

const PORT = process.env.PORT || 8000;

app.use(express.json());

const { tokenChecker } = require("./middleware");
app.post("/token", tokenChecker, (req, res) => {
  const body = req.body;
  res.send({ response: "Token must have been ok!", body: body });
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
