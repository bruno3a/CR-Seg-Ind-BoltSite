import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI)
mongoose.connect(MONGO_URI)
    .then(() => console.log('🟢 Connected to MongoDB'))
    .catch(err => console.error('🔴 Error connecting to MongoDB:', err));

// TEMPORARY ROUTE TO CLEAR ALL PRODUCTS
app.get('/delete-all-products', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send('All products deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting products: ' + err.message);
  }
});

// TEMPORARY ROUTE FOR INSERTING TEST DATA - MODIFIED TO ADD 5 PRODUCTS
app.get('/insert-test-data', async (req, res) => {
  try {
    const testProducts = [
      {
        name: 'Guantes de seguridad',
        description: 'Guantes resistentes para trabajos industriales',
        price: 10,
        category: 'Seguridad Industrial',
        icon: 'https://www.bac-dall.com.ar/products/images/soldador.jpg',
        industry: 'Construcción',
        stock: 10
      },
      {
        name: 'Botas de seguridad',
        description: 'Botas con punta de acero para protección',
        price: 50,
        category: 'Calzado',
        icon: 'https://www.bac-dall.com.ar/products/images/bota%20blanca%20pampeana%20con%20punt.jpg',
        industry: 'Construcción',
        stock: 10
      },
      {
        name: 'Casco de seguridad',
        description: 'Casco resistente a impactos',
        price: 35,
        category: 'Protección',
        icon: 'https://www.bac-dall.com.ar/products/images/msa%20299931.jpg',
        industry: 'Construcción',
        stock: 10
      },
      {
        name: 'Mameluco',
        description: 'Mameluco de trabajo industrial',
        price: 500,
        category: 'Indumentaria',
        icon: 'https://www.bac-dall.com.ar/products/images/mam-4.5-cr.jpg',
        industry: 'Manufactura',
        stock: 10
      },
      {
        name: 'Pinza para bloqueo',
        description: 'Pinza dieléctrica para bloqueo de seguridad',
        price: 30,
        category: 'Seguridad',
        icon: 'https://www.bac-dall.com.ar/products/images/428.jpg',
        industry: 'Eléctrica',
        stock: 0
      },
    ];

    await Product.insertMany(testProducts);
    res.send('Test data inserted successfully');
  } catch (err) {
    res.status(500).send('Error inserting test data: ' + err.message);
  }
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static assets after API routes.
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
