import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// Imagen por defecto en public/assets
const defaultImage = '/placeholder-product.png';

async function isValidImageUrl(url) {
  if (!url) return false;
  
  // Si es la imagen por defecto, asumimos que es válida
  if (url === defaultImage) return true;
  
  try {
    const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType.startsWith('image/');
  } catch {
    return false;
  }
}

async function validateAndFixImages() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    
    let fixedCount = 0;
    
    for (const product of products) {
      let needsUpdate = false;
      
      // Solo validar image_url
      if (!await isValidImageUrl(product.image_url)) {
        await Product.findByIdAndUpdate(product._id, {
          $set: { image_url: defaultImage }
        });
        fixedCount++;
        console.log(`Fixed image for product: ${product.name}`);
        console.log('Updated to default image');
      }
    }
    
    console.log('\n=== Summary ===');
    console.log(`Total products processed: ${products.length}`);
    console.log(`Products fixed: ${fixedCount}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDatabase connection closed');
  }
}

validateAndFixImages();


