import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    industry: { type: String },
    stock: { type: Number, required: true, default: 0 }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
