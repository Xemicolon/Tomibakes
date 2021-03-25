const session = require("express-session");
let RedisStore = require("connect-redis")(session);
let redisClient = require("../config/redis");

exports.sess = {
  store: new RedisStore({ client: redisClient, ttl: 300000 }),
  name: "sid",
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 47 * 60 * 1000, // Cookie expires after 47mins
    path: "/",
  },
  saveUninitialized: false,
  resave: false,
};
