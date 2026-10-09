const Product = require("../models/Product");

// Fetch all products from the database
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch a single product by ID (for Voir Détails)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    await product.update(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ success: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
