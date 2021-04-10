let router = require("express").Router();
const { uploadImages, deleteImages } = require("../controllers/image.js");
const { admin, authorize } = require("../middleware/index");
const { uploadController } = require("../utils/fileUpload");

router.post("/upload", authorize, uploadController, uploadImages);
router.delete("/delete/image", authorize, deleteImages);
module.exports = router;
