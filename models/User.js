const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    isAdmin: { type: Boolean, default: false, required: true },
    isBuyer: { type: Boolean, default: true, required: true },
  },
});

UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified || !user.isNew) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

module.exports = model("user", UserSchema);
