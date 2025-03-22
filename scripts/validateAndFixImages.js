import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const defaultImage = 'https://via.placeholder.com/400';

async function isValidImageUrl(url) {
  if (!url) return false;
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
      const updates = {};
      
      // Validar icon
      if (!await isValidImageUrl(product.icon)) {
        updates.icon = defaultImage;
        needsUpdate = true;
      }
      
      // Validar imageUrl
      if (!await isValidImageUrl(product.imageUrl)) {
        updates.imageUrl = product.icon || defaultImage;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await Product.findByIdAndUpdate(product._id, { $set: updates });
        fixedCount++;
        console.log(`Fixed images for product: ${product.name}`);
      }
    }
    
    console.log(`Fixed ${fixedCount} products`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

validateAndFixImages();