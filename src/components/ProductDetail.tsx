import React, { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';

interface ProductDetailProps {
  product: {
    name: string;
    description: string;
    code: string;
    brand: string;
    imageUrl: string;
    icon: string; // Add the icon property
    características: string;
    especificaciones: string;
    presentación: string;
    documentación: string;
  };
  onAddToCart: (product: any, quantity: number) => void; // Accept the add to cart function
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity); // Use the passed function to add the product
  };

  return (
    <div>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <img
              src={product.icon}
              alt={product.name}
              className="w-full h-auto object-cover rounded-t-lg flex-grow"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600 text-sm">{product.brand} - {product.code}</p>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>
          </div>

          {/* Right Side: Purchase Section and Technical Specs */}
          <div className="flex flex-col space-y-4 h-full">
            {/* Purchase Section */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 h-1/5 flex items-center">
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">Compra</h2>
                  <WhatsAppButton
                    phoneNumber="5491112345678"
                    message={`Tengo algunas dudas sobre este producto: ${product.name} (${product.code})`}
                    className="text-sm px-2 py-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="quantity" className="font-medium text-gray-700">Cantidad:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleAddToCart}
                    className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm">
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 h-4/5">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones Técnicas</h2>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <h3 className="font-semibold">Características</h3>
                  <p className="text-gray-700">{product.características}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Especificaciones</h3>
                  <p className="text-gray-700">{product.especificaciones}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Presentación</h3>
                  <p className="text-gray-700">{product.presentación}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Documentación</h3>
                  <p className="text-gray-700">{product.documentación}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
