import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES } from '../config/constants';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const navigate = useNavigate();
    const { id, name, description, price, category, stock, image_url } = product;
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true);
    };

    const imageSource = imgError || !product.image_url ? IMAGES.DEFAULT_PRODUCT : product.image_url;

    const [quantity, setQuantity] = useState(1);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        if (
            !(e.target as HTMLElement).closest('input') && 
            !(e.target as HTMLElement).closest('button')
        ) {
            navigate(`/product/${id}`);
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleCardClick}
        >
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute z-10 w-64 p-4 bg-gray-900 text-white rounded-lg shadow-xl -translate-y-full -translate-x-1/4 left-1/2 top-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-sm">{description}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-gray-900" />
                </div>
            )}

            {/* Stock badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 z-50">
                {stock > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Stock disponible
                    </span>
                )}
                {stock === 0 && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                        A pedido
                    </span>
                )}
            </div>

            <div className="p-3 flex flex-col flex-grow">
                {/* Image and category */}
                <Link to={`/product/${id}`} className="block h-48 overflow-hidden rounded-lg mb-3">
                    <img 
                        src={imageSource}
                        alt={name}
                        onError={handleImageError}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <span className="text-xs font-medium text-blue-600">{category}</span>

                {/* Product info */}
                <Link to={`/product/${id}`} className="block mt-1 mb-2 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 min-h-[40px]">{name}</h3>
                </Link>
                <div className="text-lg font-bold text-gray-900 mb-3">${Number(price).toFixed(2)}</div>

                {/* Add to cart section - fixed at bottom */}
                <div className="flex items-center gap-2 mt-auto">
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
