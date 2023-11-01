const express = require("express");
const router = express.Router();

const { wrapAsync } = require("../helpers/routerHelper");
const { sendOTP, verifyOTP,register, login } = require("../controller/user.controller");

router.post("/sendOTP", wrapAsync(sendOTP));
router.post("/verifyOTP", wrapAsync(verifyOTP));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));


module.exports = router;
