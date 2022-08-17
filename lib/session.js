const expressSession = require("express-session");
const RedisStore = require("connect-redis")(expressSession);

const session = redisClient =>
  expressSession({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "redispasswordneedstobechangedinproduction",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    unset: "destroy"
  });

module.exports = session;
