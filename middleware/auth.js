const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authorize = (req, res, next) => {
  const access_token = req.headers["x-access-token"];
  // const refresh_token = req.signedCookies["refresh_token"];
  if (!access_token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Login to continue.",
    });
  }

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };
  jwt.verify(access_token, process.env.JWT_SECRET, options, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your session has expired! Login to continue.",
      });
    }

    if (err && err.name !== "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Nice try mr hacker :)",
      });
    }

    if (decoded) {
      next();
    }
  });
};

exports.admin = async (req, res, next) => {
  const access_token = req.headers["x-access-token"];
  // const refresh_token = req.signedCookies["refresh_token"];
  if (!access_token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized! Login to continue.",
    });
  }

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };

  const userToken = jwt.decode(access_token, options, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: userToken.userID });
  if (user.role.isAdmin === false) {
    return res.status(403).json({
      success: false,
      message: "You don't have admin rights to perform this action!.",
    });
  }
  next();
};

exports.buyer = async (req, res, next) => {
  const access_token = req.headers["x-access-token"];
  // const refresh_token = req.signedCookies["refresh_token"];
  if (!access_token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized! Login to continue.",
    });
  }

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };

  const userToken = jwt.decode(access_token, options, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: userToken.userID });
  if (user.role.isBuyer === false) {
    return res.status(403).json({
      success: false,
      message: "You don't have admin rights to perform this action!.",
    });
  }
  next();
};

exports.seller = async (req, res, next) => {
  const access_token = req.headers["x-access-token"];
  // const refresh_token = req.signedCookies["refresh_token"];
  if (!access_token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized! Login to continue.",
    });
  }

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };

  const userToken = jwt.decode(access_token, options, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: userToken.userID });
  if (user.role.isSeller === false) {
    return res.status(403).json({
      success: false,
      message: "You don't have admin rights to perform this action!.",
    });
  }
  next();
};
