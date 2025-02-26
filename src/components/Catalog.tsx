import React, { useState, useEffect } from 'react';
//Añadido a posteriori
interface Product {
  name: string;
  category: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?search=${search}&filter=${filter}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, filter]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="">All categories</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>

      <div>
        {products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
