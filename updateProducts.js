import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import Product from './models/Product.js';
dotenv.config(); // Load environment variables from .env file

const updateProducts = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI); // Log the URI for debugging
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Update all products to add new attributes
        await Product.updateMany({}, {
            $set: {
                características: '',
                especificaciones: '',
                presentación: '',
                documentación: ''
            }
        });

        console.log('Products updated successfully.');
    } catch (error) {
        console.error('Error updating products:', error);
    } finally {
        await mongoose.disconnect();
    }
};

updateProducts();
