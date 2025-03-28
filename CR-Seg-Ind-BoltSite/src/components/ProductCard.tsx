import React from 'react';
import { DivideIcon as LucideIcon, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    description: string;
    icon: LucideIcon;
    price: string;
    category: string;
    image: string;
  };
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { name, description, icon: Icon, price, category, image } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <div className="p-6">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <span className="text-sm font-medium text-blue-600 mb-2 block">{category}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <button
            onClick={onAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
