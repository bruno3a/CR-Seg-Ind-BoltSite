import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkImageUrl(url) {
    if (!url) return false;
    
    try {
        const response = await fetch(url, { 
            method: 'HEAD',
            timeout: 5000 // 5 segundos de timeout
        });
        return response.ok;
    } catch (error) {
        console.log(`Error checking URL ${url}:`, error.message);
        return false;
    }
}

async function validateProductImages() {
    try {
        console.log('Conectando a la base de datos...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa');

        console.log('Buscando productos...');
        const products = await Product.find({});
        console.log(`Encontrados ${products.length} productos`);

        let invalidImagesCount = 0;
        
        console.log('\nIniciando validación de imágenes...\n');

        for (const product of products) {
            console.log(`\nValidando producto: ${product.name}`);
            
            const iconValid = await checkImageUrl(product.icon);
            const imageUrlValid = await checkImageUrl(product.imageUrl);
            
            if (!iconValid || !imageUrlValid) {
                invalidImagesCount++;
                console.log('\nProblemas encontrados:');
                console.log('------------------------');
                console.log(`Producto: ${product.name}`);
                console.log(`ID: ${product._id}`);
                if (!iconValid) console.log(`❌ Icon inválido: ${product.icon}`);
                if (!imageUrlValid && product.imageUrl) console.log(`❌ ImageUrl inválido: ${product.imageUrl}`);
                console.log('------------------------');
            } else {
                console.log('✅ Todas las imágenes válidas');
            }
        }

        console.log('\n=== Resumen de la validación ===');
        console.log(`Total de productos revisados: ${products.length}`);
        console.log(`Productos con imágenes inválidas: ${invalidImagesCount}`);
        console.log(`Productos con imágenes válidas: ${products.length - invalidImagesCount}`);

    } catch (error) {
        console.error('\nError durante la validación:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nConexión a la base de datos cerrada');
    }
}

// Ejecutar la validación
console.log('Iniciando script de validación de imágenes...\n');
validateProductImages();
