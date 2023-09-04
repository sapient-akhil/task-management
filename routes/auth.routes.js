const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")

const loginController = require("../controller/login")

router.post("/login", Validators.forReqBody(Schema.loginSchema), loginController.login)

module.exports = router;