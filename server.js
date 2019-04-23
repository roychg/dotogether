if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const db = require('lib/db')
const bp = require("body-parser");
const redis = require("./lib/redis");
const PORT = process.env.PORT || 8080;
let retryCount = 0;

const initializeServer = async () => {
  let redisClient = null;
  const app = express();
  const http = require("http").Server(app);
  const passport = require("lib/passport");
  const session = require("lib/session");

  // MONGO
  try {
    console.log("Connecting to Mongo");
    await db.connect();
  } catch (error) {
    console.log('Unable to connect to MongoDB ', error)
    if (++retryCount < 3) {
      console.log("Trying to connect to mongodb again in 3 seconds...");
      setTimeout(initializeServer, 3000);
      return;
    }
    process.exit(1);
  }

  // REDIS 
  redisClient = await redis.connect();
  redisClient.on("connect", () => console.log("Redis Connected"));
  redisClient.on("error", err => {
    console.log("Error connecting to redis ", err);
  });

  // initialize socket
  require("lib/socket")(http);

  app.use(bp.json(), bp.urlencoded({ extended: false }));
  app.use(session(redisClient));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", require("./api"));


  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });
  }

  // ERROR HANDLER
  app.use((err, req, res, next) => {
    console.log("SERVER ERROR HANDLER ", err);
    return res.status(err.status).json({ ...err });
  });
  http.listen(PORT, () => console.log(`App is on ${PORT}`));
}


initializeServer();