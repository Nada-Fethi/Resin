const express = require('express');
const { getAllProducts } = require('../Controllers/product.controller');

const router = express.Router();

router.get('/', getAllProducts);

module.exports = router;
