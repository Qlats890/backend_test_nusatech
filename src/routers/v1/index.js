const express = require("express");
const { userSignUp } = require("../../controllers/userController");
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin");

router.post("addDumpCurrency");

router.get("/userdata/q?");
router.get("/alluserdata");
router.put("/change-email");

module.exports = router;
