const express = require("express");
const {
  getEmailDependOnStatus,
} = require("../../controllers/mailerController");
const {
  userSignUp,
  verify,
  userSignIn,
  getUserData,
  userNotifChangeEmail,
  userChangeEmail,
} = require("../../controllers/userController");
const { jwtCheck } = require("../../middlewares/auth");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);

// router.post("addDumpCurrency");

router.get("/userdata", jwtCheck, getUserData);
router.put("/change-email", jwtCheck, userChangeEmail);

router.get("/verify/:pin", verify);
router.post("/send-notif-change-email", jwtCheck, userNotifChangeEmail);
// router.get("/ck", getEmailDependOnStatus);

module.exports = router;
