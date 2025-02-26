const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Crear un producto
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

module.exports = router;
