import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    características: { type: String },
    especificaciones: { type: String },
    presentación: { type: String },
    documentación: { type: String },
    name: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image_url: { type: String, required: true, default: '/placeholder-product.png' },
    industry: { type: String },
    stock: { type: Number, required: true, default: 0 }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
