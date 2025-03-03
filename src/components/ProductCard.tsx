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
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Link to={`/product/${_id}`} className="mb-4 flex-grow flex items-center justify-center">
                <img src={icon} alt={name} className="h-48 w-48 object-contain" />
            </Link>
            <span className="text-sm font-medium text-blue-600 mb-1">{category}</span>
            <Link to={`/product/${_id}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            </Link>
            <span className="text-xl font-bold text-gray-900">{`$${Number(price).toFixed(2)}`}</span>
            {showTooltip && (
                <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-md text-sm z-10">
                    {description}
                </div>
            )}
            {stock > 0 && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Disponible
                </span>
            )}
            <div className="flex items-center justify-end mt-auto">
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-2 py-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                />
                <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
