if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const db = require('lib/db')
const bp = require("body-parser");
const redis = require("./lib/redis");
const PORT = process.env.PORT || 8080;

const initializeServer = async () => {
  let redisClient = null;
  const app = express();
  const http = require("http").Server(app);

  http.listen(PORT, () => console.log(`App is on ${PORT}`));
}


initializeServer();