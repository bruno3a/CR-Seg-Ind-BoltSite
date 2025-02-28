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

// Agregar múltiples productos
router.post('/add-multiple', async (req, res) => {
  try {
    const newProducts = req.body; // Array de productos a agregar
    if (!Array.isArray(newProducts)) {
      return res.status(400).json({ message: 'Se espera un array de productos' });
    }

    const insertedProducts = await Product.insertMany(newProducts); // Insertar los productos en la base de datos
    res.status(201).json(insertedProducts); // Retornar los productos insertados con un estado 201
  } catch (err) {
    res.status(400).json({ message: 'Error al agregar productos', error: err.message }); // Manejo de errores al agregar productos
  }
});

// Actualizar la imagen de un producto
router.put('/:id/image', async (req, res) => {
  const { id } = req.params;
  const { icon } = req.body;

  try {
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    // Buscar el producto por ID y actualizar la imagen
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { icon: icon },
      { new: true } // Para retornar el producto actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(updatedProduct); // Retornar el producto actualizado
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la imagen del producto', error: err.message });
  }
});

export default router;
