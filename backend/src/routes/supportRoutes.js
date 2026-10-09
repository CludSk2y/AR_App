const express = require("express");
const router = express.Router();
const { getSupportInfo } = require("../controllers/supportController");

router.get("/", getSupportInfo);

module.exports = router;
