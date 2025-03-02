import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, icon, price, category, _id, brand, code, normative } = product;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
          <img src={icon} alt={name} className="w-full h-auto object-contain" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <p>
            <strong>Código:</strong> {code}
          </p>
          <p>
            <strong>Marca:</strong> {brand}
          </p>
          <p className="text-blue-600 font-semibold text-xl mb-4">{`$${Number(price).toFixed(2)}`}</p>

          <p className="mt-4">
            <strong>Normativa:</strong>
          </p>
          <p>{normative}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Detalle del Producto</h2>
        <p>Detalles del producto aquí...</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Ficha Técnica</h2>
        <a href="#" className="text-blue-600 hover:underline">
          Descargar Ficha Técnica (PDF)
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Datos Técnicos</h2>
        <p>Datos técnicos aquí...</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Productos Asociados</h2>
        <p>Lista de productos asociados aquí...</p>
      </div>
    </div>
  );
};

export default ProductDetail;
