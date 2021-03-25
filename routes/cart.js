let router = require("express").Router();
const {
  addToCart,
  getCart,
  deleteCart,
  deleteItemFromCart,
} = require("../controllers/cart");
const { admin, authorize } = require("../middleware/index");

router.post("/cart", authorize, addToCart);
router.get("/cart", authorize, getCart);
router.delete("/delete/cart/:cartId", authorize, deleteCart);
router.delete("/delete/:productId/cart", deleteItemFromCart);

module.exports = router;
