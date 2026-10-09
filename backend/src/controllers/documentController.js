const multer = require("multer");
const path = require("path");

// Configure storage engine for multer to define destination folder and unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Updated destination path to match the existing root 'uploads' folder
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Append current timestamp to the original file name to avoid naming collisions
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer upload middleware with storage settings
const upload = multer({ storage: storage }).single("catalog");

/**
 * Controller function to handle catalog/document uploads
 * @route POST /api/documents/upload-catalog
 */
exports.uploadCatalog = (req, res) => {
  upload(req, res, (err) => {
    // Handle multer-specific errors
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    // Check if a file was actually provided in the request
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file was uploaded." });
    }

    // Return success response with the relative file path
    res.status(200).json({
      success: true,
      message: "Catalog uploaded successfully!",
      filePath: `/uploads/${req.file.filename}`,
    });
  });
};
