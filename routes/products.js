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
    if (err.code === 11000) {
      // Duplicate key error (MongoServerError)
      return res.status(400).json({ message: 'Ya existe un producto con ese nombre.' });
    }
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

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el producto', error: err.message });
  }
});

// TEMPORARY ROUTE TO REMOVE DUPLICATE PRODUCTS
router.delete('/remove-duplicates', async (req, res) => {
  try {
    const duplicates = await Product.aggregate([
      {
        $group: {
          _id: { name: "$name" },
          dups: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    const removedProductIds = [];

    for (const dup of duplicates) {
      const idsToRemove = dup.dups.slice(1); // Keep the first one, remove the rest
      removedProductIds.push(...idsToRemove)
      await Product.deleteMany({ _id: { $in: idsToRemove } });
    }

    res.json({ message: "Duplicates removed", removedIds: removedProductIds });
  } catch (err) {
    res.status(500).json({ message: "Error removing duplicates", error: err.message });
  }
});

export default router;
