import React, { useEffect, useRef, useCallback } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';

interface CartItem {
    _id: string;
    name: string;
    price: string;
    quantity: number;
    category: string;
    brand: string;
}

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onDetailedOrder?: () => void; // Nuevo prop para manejar el click en orden detallada
}

const Cart: React.FC<CartProps> = ({ 
    isOpen, 
    onClose, 
    items, 
    onUpdateQuantity, 
    onRemoveItem,
    onDetailedOrder 
}) => {
    const cartRef = useRef<HTMLDivElement>(null);

    // Usar useCallback para el manejador del click fuera
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, handleClickOutside]);

    const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + price * item.quantity;
    }, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div ref={cartRef} className="bg-white w-full max-w-md h-full flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center">
                        <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
                        <h2 className="text-xl font-semibold">Orden de Compra</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Tu orden está vacía</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                        <div className="text-sm text-gray-600">
                                            <span className="mr-2">{item.category}</span>
                                            <span className="text-gray-400">|</span>
                                            <span className="ml-2">{item.brand}</span>
                                        </div>
                                        <p className="text-blue-600 mt-1">{`$${Number(item.price).toFixed(2)}`}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item._id, Math.max(0, item.quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => onRemoveItem(item._id)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onDetailedOrder}
                            className="flex-1 bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-200 transition duration-300"
                            disabled={items.length === 0}
                        >
                            Orden Detallada
                        </button>
                        <button
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                            disabled={items.length === 0}
                        >
                            Finalizar Orden
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
