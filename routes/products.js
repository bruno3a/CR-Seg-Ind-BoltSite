import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Lista de productos');
});

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


export default router;