import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updateProductDummyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Update the specific product with dummy data
        await Product.updateOne(
            { _id: '67c524e9d08042cac64d537e' },
            {
                $set: {
                    características: 'Características de ejemplo',
                    especificaciones: 'Especificaciones de ejemplo',
                    presentación: 'Presentación de ejemplo',
                    documentación: 'http://example.com/documentacion'
                }
            }
        );

        console.log('Product updated with dummy data successfully.');
    } catch (error) {
        console.error('Error updating product:', error);
    } finally {
        await mongoose.disconnect();
    }
};

updateProductDummyData();
