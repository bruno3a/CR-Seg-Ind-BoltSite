import React from 'react';
import { CartItem } from '../types';
import { ArrowLeft, FileText, Send } from 'lucide-react';

interface OrderDetailProps {
    items: CartItem[];
    onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ items, onClose }) => {
    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + price * item.quantity;
    }, 0);

    const iva = subtotal * 0.21; // 21% IVA
    const total = subtotal + iva;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-6">
                    {/* Columna izquierda - Detalles de la orden */}
                    <div className="flex-1 bg-white rounded-lg shadow">
                        <div className="p-6 border-b flex items-center">
                            <button
                                onClick={onClose}
                                className="mr-4 text-gray-600 hover:text-gray-800"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">Detalle de la Orden</h1>
                        </div>
                        
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Producto</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Marca</th>
                                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Cantidad</th>
                                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Precio Unit.</th>
                                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {items.map((item) => {
                                            const subtotal = parseFloat(item.price) * item.quantity;
                                            return (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{item.brand}</td>
                                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-right text-gray-900">
                                                        ${Number(item.price).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-right font-medium text-blue-600">
                                                        ${subtotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Desglose impositivo */}
                            <div className="mt-8 border-t pt-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">IVA (21%)</span>
                                        <span className="text-gray-900">${iva.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-semibold pt-4 border-t">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-blue-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Acciones */}
                    <div className="w-80">
                        <div className="bg-white rounded-lg shadow p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
                            
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                                <Send className="w-5 h-5" />
                                Emitir Orden
                            </button>
                            
                            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
                                <FileText className="w-5 h-5" />
                                Descargar PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
