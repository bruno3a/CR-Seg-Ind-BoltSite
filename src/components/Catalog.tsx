import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { industries } from '../utils';
import IndustryFilter from './IndustryFilter';
import { Search } from 'lucide-react';

interface CatalogProps {
    onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let query = supabase
                    .from('products')
                    .select('*');

                // Aplicar filtros
                if (search) {
                    query = query.ilike('name', `%${search}%`);
                }

                if (selectedCategories.length > 0) {
                    query = query.in('category', selectedCategories);
                }

                if (selectedIndustries.length > 0) {
                    query = query.in('industry', selectedIndustries);
                }

                if (selectedBrands.length > 0) {
                    query = query.in('brand', selectedBrands);
                }

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                setProducts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, selectedCategories, selectedIndustries, selectedBrands]);

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

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
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
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Products grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {paginatedProducts.map(product => (
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

                    {/* Pagination controls container */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-8 space-y-4">
                            {/* Items per page selector */}
                            <div className="flex justify-end items-center gap-2">
                                <span className="text-sm text-gray-600">Mostrar:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                    className="border rounded-md px-2 py-1 text-sm"
                                >
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Anterior
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded-md ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
