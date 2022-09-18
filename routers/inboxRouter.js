// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getInbox } = require("../controller/inboxController");

// // login pae
router.get("/", getInbox);

module.exports = router;
