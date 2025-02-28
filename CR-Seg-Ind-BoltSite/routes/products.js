import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// Obtener productos con búsqueda y filtro
router.get('/', async (req, res) => {
  const { search, filter } = req.query;
  try {
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' }; // búsqueda por nombre (case-insensitive)
    if (filter) query.category = filter; // filtro por categoría

    const products = await Product.find(query); // Obtener productos con los criterios de búsqueda y filtro
    res.json(products); // Retornar los productos encontrados
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message }); // Manejo de errores
  }
});

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Crear una nueva instancia de Producto con los datos del body
    await newProduct.save(); // Guardar el nuevo producto en la base de datos
    res.status(201).json(newProduct); // Retornar el nuevo producto con un estado 201
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto', error: err.message }); // Manejo de errores al crear producto
  }
});

export default router;