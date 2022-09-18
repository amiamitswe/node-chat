// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/Common/decorateHtmlResponse");

// login pae
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
