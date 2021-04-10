const redis = require("redis");

let redisClient = redis.createClient({
  port: 6379,
  url:
    process.env.NODE === "production"
      ? process.env.REDIS_URL
      : "redis://127.0.0.1:6379",
  host: "127.0.0.1",
  no_ready_check: true,
  auth_pass:
    process.env.NODE === "production" ? process.env.REDIS_AUTH_PASS : "",
});

redisClient.on("connect", () => {
  console.log("Redis is connected!");
});

module.exports = redisClient;
