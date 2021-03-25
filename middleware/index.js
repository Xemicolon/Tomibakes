const { admin, buyer, seller, authorize } = require("./auth");
const limit = require(".././middleware/rateLimiter");
module.exports = {
  admin,
  buyer,
  seller,
  authorize,
  limit,
};
