const User = require("../models/User");
const {
  comparePassword,
  checkPassword,
  generateToken,
  createJWT,
  decodeJWT,
} = require("../utils/index");
const redisClient = require("../config/redis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
    return;
  }

  if (password && password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be longer than 6 characters",
    });
    return;
  }

  if (!checkPassword(password)) {
    res.status(400).json({
      success: false,
      message:
        "Password must be minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character ",
    });
    return;
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "Hmm... This account already exists!",
      });
      return;
    }

    const newUser = await User.create({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "Hello " + newUser.email + ", your account has been created!",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "One or more fields are missing!",
    });
    return;
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Account doesn't exist",
      });
      return;
    }

    const verifyPassword = comparePassword(password, user.password);
    if (!verifyPassword) {
      res.status(400).json({
        success: false,
        message: "Your login info is incorrect!",
      });
      return;
    }

    const userData = {
      userID: user._id,
    };

    const access_token = createJWT(userData);
    const refresh_token = generateToken(256);

    // res.cookie("access_token", access_token, {
    //   httpOnly: !process.env.NODE_ENV === "development" ? true : false,
    //   sameSite: !process.env.NODE_ENV === "development" ? true : false,
    //   signed: true,
    //   secure: !process.env.NODE_ENV === "development" ? true : false,
    //   maxAge: 5 * 60 * 1000,
    // });

    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: !process.env.NODE_ENV === "development" ? true : false,
    //   sameSite: !process.env.NODE_ENV === "development" ? true : false,
    //   signed: true,
    //   secure: !process.env.NODE_ENV === "development" ? true : false,
    //   maxAge: 30 * 60 * 1000,
    // });

    redisClient.set(
      JSON.stringify(user._id),
      JSON.stringify({
        refresh_token: refresh_token,
      }),
      "EX",
      14400, // valid for 4 hours
      (err, response) => {
        if (err) {
          console.log(err);
          return err;
        }
        // console.log(response);
        return response;
      }
    );

    res.status(200).json({
      success: true,
      message: "Welcome back " + user.email,
      user: user,
      token: access_token,
      refresh: refresh_token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.refresh = async (req, res) => {
  const access_token = req.headers["x-access-token"] || null;
  const refresh_token = req.headers["x-access-refresh"] || null;

  if (!access_token) {
    return res.status(400).json({
      success: false,
      message: "Your session has expired! Login to continue.",
    });
  }
  if (access_token && !refresh_token) {
    return res.status(400).json({
      success: false,
      message: "Your session has expired! Login to continue.",
    });
  }

  if (!access_token && !refresh_token) {
    return res.status(400).json({
      success: false,
      message: "Your session has expired! Login to continue.",
    });
  }

  const options = {
    algorithm: "HS256",
    expiresIn: "45m",
    audience: "light-xemicolon",
  };

  jwt.verify(access_token, process.env.JWT_SECRET, options, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const user = decodeJWT(access_token); // lets decode token to get userID

        redisClient.get(JSON.stringify(user.userID), (err, userToken) => {
          // we check redis for existing user ID with refresh token if it exists
          if (err) {
            res.status(401).json({
              success: false,
              message: "An error occured while trying to verify who you are.",
            });
          } else {
            if (!userToken || userToken.refresh_token === refresh_token) {
              res.status(403).json({
                success: false,
                message: "Nice try mr hacker. hahahaha ",
              });
            } else {
              // check if refresh token hasn't expired yet
              redisClient.ttl(
                JSON.stringify(user.userID),
                (err, tokenExpiry) => {
                  console.log(tokenExpiry);
                  if (err) {
                    res.status(403).json({
                      success: false,
                      message:
                        "Authentorization has failed! Login to continue.",
                    });
                  } else {
                    // delete old refresh token
                    redisClient.del(
                      JSON.stringify(user.userID),
                      (err, result) => {
                        return result;
                      }
                    );
                    // issue new refresh and access token
                    const userData = {
                      userID: user.userID,
                    };
                    const newRefreshToken = generateToken(256);
                    const newAccessToken = createJWT(userData);
                    // res.cookie("refresh_token", newRefreshToken, {
                    //   httpOnly:
                    //     !process.env.NODE_ENV === "development" ? true : false,
                    //   sameSite:
                    //     !process.env.NODE_ENV === "development" ? true : false,
                    //   signed: true,
                    //   secure:
                    //     !process.env.NODE_ENV === "development" ? true : false,
                    //   maxAge: 30 * 60 * 1000,
                    // });

                    redisClient.set(
                      JSON.stringify(user.userID),
                      JSON.stringify({
                        refresh_token: newRefreshToken,
                      }),
                      "EX",
                      14400,
                      (err, response) => {
                        if (err) {
                          console.log(err);
                          return err;
                        }
                        console.log(response);
                        return response;
                      }
                    );
                    res.status(201).json({
                      success: true,
                      message:
                        "Your tokens have been refreshed. Enjoy your stay :)",
                      access_token: newAccessToken,
                      refresh_token: newRefreshToken,
                    });
                  }
                }
              );
            }
          }
        });
      } else {
        //  malformed or invalid token here
        res.status(403).json({
          success: false,
          message: "Nice try mr hacker :)",
        });
      }
    } else {
      // token is valid
      res.status(200).json({
        success: true,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
};

exports.updatepassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) {
    res.status(400).json({
      success: false,
      message: "You need your old password to continue.",
    });
  }

  const token = decodeJWT(req.headers["x-access-token"]);
  const user = await User.findById(token.userID);
  decryptOldPassword = comparePassword(oldPassword, user.password);
  if (decryptOldPassword === false) {
    return res.status(400).json({
      success: false,
      message: "Your old password is incorrect!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

exports.logout = async (req, res) => {
  const accessToken = req.headers["x-access-token"];
  const refreshToken = req.signedCookies["refresh_token"];

  const user = decodeJWT(accessToken);

  if (accessToken && refreshToken) {
    redisClient.del(JSON.stringify(user.userID), (err, result) => {
      return result;
    });
    // res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
      message: "You have successfully logged out!",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "You are already logged out!",
    });
  }
};
