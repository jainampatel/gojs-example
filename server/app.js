const express = require("express");
const bodyParser = require("body-parser");
const user = require("./Routes/userRoutes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/user", user);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
  });
});

app.listen(5000);
