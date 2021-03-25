const router = require("express").Router();
const {
  signUp,
  login,
  logout,
  refresh,
  updatepassword,
} = require("../controllers/auth");
const { authorize } = require("../middleware/index");

router.post("/signup", signUp);
router.post("/login", login);
router.patch("/update-password", authorize, updatepassword);
router.get("/refresh", refresh);
router.delete("/logout", logout);
module.exports = router;
