const express = require("express");
const router = express.Router();
const Schema = require("../helper/schema")
const Validators = require("../helper/validation")

const loginController = require("../controller/login")

router.post("/login", Validators.forReqBody(Schema.loginSchema), loginController.login)
router.post("/forgotPassword", loginController.forgottenPassword)
router.post("/resetPassword", loginController.resetForgotPassword)
router.post("/verifyOtp", loginController.verifyOtp)

module.exports = router;