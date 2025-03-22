import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const { name, description, icon, price, category, _id, stock } = product;
    const [quantity, setQuantity] = useState(1);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute z-10 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl -translate-y-full -translate-x-1/4 left-1/2 top-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-sm">{description}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-gray-900" />
                </div>
            )}

            <div className="p-3">
                {/* Stock badge */}
                {stock > 0 && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Stock disponible
                    </span>
                )}

                {/* Image and category */}
                <Link to={`/product/${_id}`} className="block aspect-square overflow-hidden rounded-lg mb-3">
                    <img src={icon} alt={name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </Link>
                <span className="text-xs font-medium text-blue-600">{category}</span>

                {/* Product info */}
                <Link to={`/product/${_id}`} className="block mt-1 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600">{name}</h3>
                </Link>
                <div className="text-lg font-bold text-gray-900">${Number(price).toFixed(2)}</div>

                {/* Add to cart section */}
                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => onAddToCart(product, quantity)}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
