import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

// Verificar que las variables de entorno estén disponibles
console.log('Checking environment variables...');
if (!process.env.SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined in environment variables');
}
if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_KEY is not defined in environment variables');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const migrateToSupabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all products from MongoDB
    console.log('Fetching products from MongoDB...');
    const products = await Product.find({});
    console.log(`Found ${products.length} products in MongoDB`);

    if (products.length === 0) {
      console.log('No products found in MongoDB to migrate');
      return;
    }

    // Transform products for Supabase
    console.log('Transforming products for Supabase...');
    const transformedProducts = products.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      icon: product.icon,
      industry: product.industry,
      brand: product.brand,
      stock: product.stock,
      image_url: product.imageUrl,
      caracteristicas: product.características,
      especificaciones: product.especificaciones,
      presentacion: product.presentación,
      documentacion: product.documentación
    }));

    console.log('Sample of transformed product:', transformedProducts[0]);

    // Insert products into Supabase
    console.log(`Attempting to insert ${transformedProducts.length} products into Supabase...`);
    const { error } = await supabase
      .from('products')
      .insert(transformedProducts);

    if (error) {
      throw error;
    }

    console.log(`Successfully migrated ${transformedProducts.length} products to Supabase`);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error);
    // Log more details about the error
    if (error.message) console.error('Error message:', error.message);
    if (error.details) console.error('Error details:', error.details);
    if (error.hint) console.error('Error hint:', error.hint);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

migrateToSupabase();


