if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;

const initializeServer = async () => {
  const app = express();
  const http = require("http").Server(app);

  http.listen(PORT, () => console.log(`App is on ${PORT}`));
}


initializeServer();