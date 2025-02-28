import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product;  // Exportación por defecto
