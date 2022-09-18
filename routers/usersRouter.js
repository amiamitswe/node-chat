// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getUsers } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/Common/decorateHtmlResponse");

// // login pae
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
