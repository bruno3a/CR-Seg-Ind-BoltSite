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

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Connection
const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cr_seg_ind';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🟢 Connected to MongoDB'))
  .catch(err => console.error('🔴 MongoDB connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
