// src/Controllers/product.controller.js

const Product = require("./product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products" });
  }
};

module.exports = {
  getAllProducts
};
