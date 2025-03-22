import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { industries } from '../utils';
import IndustryFilter from './IndustryFilter';
import { Search } from 'lucide-react';

interface CatalogProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    useEffect(() => {
        const searchParam = searchParams.get('search');
        if (searchParam) {
            setSearch(searchParam);
        }
    }, [searchParams]);

    const brands = Array.from(new Set(products.map(product => product.brand))).filter(Boolean);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSearchParams(event.target.value ? { search: event.target.value } : {});
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleIndustryChange = (industryName: string) => {
        setSelectedIndustries(prev =>
            prev.includes(industryName)
                ? prev.filter(ind => ind !== industryName)
                : [...prev, industryName]
        );
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter(product =>
            selectedCategories.length === 0 || selectedCategories.includes(product.category)
        )
        .filter(product =>
            selectedIndustries.length === 0 || selectedIndustries.includes(product.industry)
        )
        .filter(product =>
            selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand))
        );

    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="flex gap-6">
                {/* Filters sidebar */}
                <div className="w-72 flex-shrink-0">
                    <IndustryFilter
                        allIndustries={industries}
                        selectedIndustries={selectedIndustries}
                        onIndustryChange={handleIndustryChange}
                        brands={brands}
                        selectedBrands={selectedBrands}
                        onBrandChange={handleBrandChange}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1">
                    {/* Categories */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {uniqueCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${selectedCategories.includes(category)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Products grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
