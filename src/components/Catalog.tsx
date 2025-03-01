import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { industries } from '../utils';
import IndustryFilter from './IndustryFilter';

interface CatalogProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
        );
    };

    const handleIndustryChange = (industryName: string) => {
        setSelectedIndustries((prevIndustries) => {
            if (prevIndustries.includes(industryName)) {
                return prevIndustries.filter((ind) => ind !== industryName);
            } else {
                return [...prevIndustries, industryName];
            }
        });
    };


    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) =>
            selectedCategories.length > 0
                ? selectedCategories.includes(product.category)
                : true
        )
        .filter((product) =>
            selectedIndustries.length > 0
                ? selectedIndustries.includes(product.industry) // Filter by industry
                : true
        );
    const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category))
    );

    return (
        <div className="flex p-4">
      <IndustryFilter
        allIndustries={industries}
        selectedIndustries={selectedIndustries}
        onIndustryChange={handleIndustryChange}
      />
            <div className="flex-grow ml-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex flex-wrap">
                        {uniqueCategories.map((category) => (
                            <span
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`cursor-pointer bg-blue-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2 ${selectedCategories.includes(category) ? 'bg-opacity-100' : 'bg-opacity-50'
                                    }`}
                            >
                                {category}
                            </span>
                        ))}

                    </div>
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
        </div>
    );
};

export default Catalog;
