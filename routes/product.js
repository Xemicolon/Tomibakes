let router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/products");
const { admin, authorize } = require("../middleware/index");
const { uploadController } = require("../utils/fileUpload");

router.get("/products", getAllProducts);
router.get("/product/:productId", getProduct);
router.post("/product/add", uploadController, addProduct);
router.patch(
  "/product/update/:productId",
  // authorize,
  // admin,
  updateProduct
);

router.delete("/product/delete/:productId", deleteProduct);
module.exports = router;
