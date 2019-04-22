const redis = require("redis");
const connect = async () => {
  return await redis.createClient(process.env.REDIS_HOST);
};

exports.connect = connect;
