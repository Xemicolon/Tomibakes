const redis = require("redis");

let redisClient = redis.createClient({
  port: 6379,
  url: process.env.REDIS_URL,
  host: "localhost",
  no_ready_check: true,
  auth_pass: process.env.REDIS_AUTH_PASS,
});

redisClient.on("connect", () => {
  console.log("Redis is connected!");
});

module.exports = redisClient;
