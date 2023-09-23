const express = require("express");
const router = express.Router();

const uploadImage = require("../controller/common/image")

router.post("/upload/file", uploadImage.uploadImage);

module.exports = router;