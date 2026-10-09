const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

// POST route for uploading a catalog document
router.post("/upload-catalog", documentController.uploadCatalog);

module.exports = router;
