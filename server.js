const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./dbConnect");

const PORT = process.env.PORT || 8000;

app.use(express.json());

const loginRoutes = require("./routes/loginRoutes");
app.use("/login", loginRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
