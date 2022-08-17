const redis = require("redis");
const connect = async () => {
  return await redis.createClient({url: process.env.REDIS_URL});
};

exports.connect = connect;
