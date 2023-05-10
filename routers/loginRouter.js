// external imports
const express = require("express");
const router = express.Router();

// page title
const page_title = "Login";

// internal imports
const { getLogin, doLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

// login pae
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  doLogin
);

module.exports = router;
