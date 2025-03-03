import React from 'react';
import WhatsAppButton from './WhatsAppButton';

interface ProductDetailProps {
  product: {
    name: string;
    description: string;
    code: string;
    brand: string;
    imageUrl: string;
    icon: string; // Add the icon property
    technicalSpecs: { [key: string]: string };
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image and Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <img
            src={product.icon}
            alt={product.name}
            className="w-3/4 h-auto object-cover rounded-t-lg" // Reduce size by 25%
          />
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 text-sm">{product.brand} - {product.code}</p>
            <p className="text-gray-600 text-sm">URL: {product.imageUrl}</p>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 h-4/5">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones Técnicas</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-semibold">Características</h3>
              <p className="text-gray-700">{product.technicalSpecs['Características']}</p>
            </div>
            <div>
              <h3 className="font-semibold">Especificaciones</h3>
              <p className="text-gray-700">{product.technicalSpecs['Especificaciones']}</p>
            </div>
            <div>
              <h3 className="font-semibold">Presentación</h3>
              <p className="text-gray-700">{product.technicalSpecs['Presentación']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div className="mt-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 h-1/5 flex flex-col justify-between">
        <div className="flex items-center mb-2">
          <label htmlFor="quantity" className="mr-2 font-medium text-gray-700">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            defaultValue="1"
            className="w-16 px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="mb-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
          Agregar
        </button>
        <WhatsAppButton phoneNumber="5491112345678" message={`Tengo algunas dudas sobre este producto: ${product.name} (${product.code})`} />
      </div>
    </div>
  );
};

export default ProductDetail;