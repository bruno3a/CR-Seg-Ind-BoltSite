import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    );

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Todas las categorías</option>
          {/* Aquí deberías obtener las categorías únicas de tus productos */}
          {/* Por ahora, usaré algunas categorías de ejemplo */}
          <option value="Seguridad Industrial">Seguridad Industrial</option>
          <option value="Calzado">Calzado</option>
          <option value="Protección">Protección</option>
        </select>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
