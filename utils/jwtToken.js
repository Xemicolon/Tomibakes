const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const redis = require("../config/redis");

exports.generateToken = (num) => {
  return crypto.randomBytes(num).toString("hex");
};

exports.createJWT = (data) => {
  data.iss = "xemicolon-ecommerce-app";
  data.jti = crypto.randomBytes(24).toString("hex");

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, options);
  // split token so we can get signature
  // save header and payload in redis store/express session
  // send signature to client (this will be used to verify token header and payload in redis store) as token
  return token;
};

exports.createRefreshJWT = (data) => {
  data.iss = "xemicolon";
  data.jti = crypto.randomBytes(32).toString("hex");
  const options = {
    algorithm: "HS512",
    expiresIn: "2d",
    audience: "light",
  };
  const token = jwt.sign(data, process.env.JWT_REFRESH_SECRET, options);

  return token;
};

exports.decodeJWT = (data) => {
  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };
  const payload = jwt.decode(data, options, process.env.JWT_SECRET);
  return payload;
};
