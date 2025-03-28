import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js'; // Importar Product para la ruta de prueba
import cors from 'cors'; // Import the cors middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express(); // Definir la variable app

// Middleware para servir archivos estáticos
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Conectar a MongoDB
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cr_seg_ind';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// RUTA TEMPORAL PARA INSERTAR DATOS DE PRUEBA
app.get('/insert-test-data', async (req, res) => {
  try {
    const testProducts = [
      {
        name: 'Guantes de seguridad',
        description: 'Guantes resistentes para trabajos industriales',
        price: 25,
        category: 'Seguridad Industrial',
        icon: 'https://example.com/guantes.jpg', // Agregar una URL de imagen de ejemplo
      },
      {
        name: 'Botas de seguridad',
        description: 'Botas con punta de acero para protección',
        price: 50,
        category: 'Calzado',
        icon: 'https://example.com/botas.jpg', // Agregar una URL de imagen de ejemplo
      },
      {
        name: 'Casco de seguridad',
        description: 'Casco resistente a impactos',
        price: 35,
        category: 'Protección',
        icon: 'https://example.com/casco.jpg', // Agregar una URL de imagen de ejemplo
      },
    ];

    await Product.insertMany(testProducts);
    res.send('Datos de prueba insertados correctamente');
  } catch (err) {
    res.status(500).send('Error al insertar datos de prueba: ' + err.message);
  }
});

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
