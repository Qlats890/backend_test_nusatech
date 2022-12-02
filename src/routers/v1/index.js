const express = require("express");
const {
  getEmailDependOnStatus,
} = require("../../controllers/mailerController");
const {
  userSignUp,
  verify,
  userSignIn,
  getUserData,
} = require("../../controllers/userController");
const { jwtCheck } = require("../../middlewares/auth");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);

// router.post("addDumpCurrency");

router.get("/userdata", jwtCheck, getUserData);
router.put("/change-email");

router.get("/verify/:pin", verify);
// router.get("/ck", getEmailDependOnStatus);

module.exports = router;
