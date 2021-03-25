const { decodeJWT } = require("../utils/jwtToken");
const User = require("../models/User");

exports.user = async (req, res) => {
  const token = decodeJWT(req.headers["x-access-token"]);
  const user = await User.findById(token.userID);
  res.status(200).json({
    success: true,
    user: {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      fullname:
        user.firstName && user.lastName
          ? user.firstName + " " + user.lastName
          : "Not set yet.",
      user_role: user.role,
    },
    token: req.headers["x-access-token"],
    refresh: req.headers["x-refresh-token"],
  });
};

exports.updateUser = async (req, res) => {
  const { firstname, lastname, logo, description, sellername } = req.body;
  const token = decodeJWT(req.headers["x-access-token"]);
  const user = await User.findById(token.userID);

  user.firstName = firstname;
  user.lastName = lastname;
  user.save();
  res.status(200).json({
    success: true,
    message: "Updated successfully.",
  });
};
