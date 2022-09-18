// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getUsers } = require("../controller/userController");

// // login pae
router.get("/", getUsers);

module.exports = router;
