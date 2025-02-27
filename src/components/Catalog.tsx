import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { DivideIcon, type LucideProps } from 'lucide-react';
import './Catalog.css'; // Import the CSS file

interface Product {
  _id: string;
  name: string;
  description: string;
  icon: React.FC<LucideProps>;
  price: string;
  category: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const handleAddToCart = () => {
    // Lógica para agregar al carrito (pendiente de implementación)
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/api/products';
        const queryParams = [];

        if (search) {
          queryParams.push(`search=${encodeURIComponent(search)}`);
        }
        if (categoryFilter) {
          queryParams.push(`filter=${encodeURIComponent(categoryFilter)}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        const data = await response.json();
        // Ajustar los datos para que coincidan con la interfaz Product
        const productsWithIcon = data.map((product: any) => ({
          ...product,
          icon: DivideIcon, // Usar un icono específico en lugar de LucideIcon
          price: product.price.toString(), // Convertir precio a string
        }));

        setProducts(productsWithIcon);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, categoryFilter]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearchChange}
        />
        <select value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">Todas las categorías</option>
          {/* Aquí deberías obtener las categorías únicas de tus productos */}
          {/* Por ahora, usaré algunas categorías de ejemplo */}
          <option value="Seguridad Industrial">Seguridad Industrial</option>
          <option value="Calzado">Calzado</option>
          <option value="Protección">Protección</option>
        </select>
      </div>
      <div>
        <h1>Catálogo de Productos</h1>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalog;
