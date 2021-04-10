const express = require("express");
const router = express.Router();
const { user, updateUser } = require("../controllers/index");
const { authorize } = require("../middleware/index");

router.get("/user", authorize, user);
router.patch("/user/update-account", authorize, updateUser);
module.exports = router;
