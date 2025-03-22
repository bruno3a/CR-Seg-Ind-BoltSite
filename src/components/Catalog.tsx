import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductFilters, PaginatedResponse, Product } from '../types';
import { z } from 'zod';
import ProductCard from './ProductCard';
import { industries } from '../utils';
import IndustryFilter from './IndustryFilter';
import { Search } from 'lucide-react';
import Pagination from './Pagination';
import { X } from 'lucide-react';

// Schema validation
const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  category: z.string(),
  industry: z.string().nullable(),
  brand: z.string().nullable(),
  stock: z.number(),
});

interface CatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const queryClient = useQueryClient();

  // Cache con React Query
  const fetchProducts = useCallback(async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { page, itemsPerPage, search, categories, industries, brands } = filters;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('name');

    if (search) {
      query = query.textSearch('name', search, {
        config: 'english',
        type: 'websearch'
      });
    }

    if (categories?.length) query = query.in('category', categories);
    if (industries?.length) query = query.in('industry', industries);
    if (brands?.length) query = query.in('brand', brands);

    const { data, error, count } = await query.range(start, end);

    if (error) throw error;

    // Transformar los productos sin modificar las imágenes
    const transformedProducts = data.map(product => ({
      ...product,
      // No sobreescribimos icon aquí, mantenemos el original
      price: product.price.toString(),
    }));

    return {
      data: transformedProducts,
      count: count || 0
    };
  }, []);

  // Fetch inicial de productos
  const {
    data: productsResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['products', search],
    queryFn: () => fetchProducts({
      search,
      categories: [],
      industries: [],
      brands: [],
      page: 1,
      itemsPerPage: 1000
    }),
    select: (data) => {
      // Eliminar duplicados basados en el ID
      const uniqueProducts = data.data.reduce((acc, current) => {
        if (!acc.find(item => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, [] as Product[]);

      return {
        data: uniqueProducts,
        count: uniqueProducts.length
      };
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  // Filtrado local de productos
  const filteredProducts = useMemo(() => {
    if (!productsResponse?.data) return { data: [], count: 0 };

    let filtered = productsResponse.data;

    // Aplicar filtros localmente
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(product => product.industry && selectedIndustries.includes(product.industry));
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => product.brand && selectedBrands.includes(product.brand));
    }

    // Calcular paginación
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    return {
      data: filtered.slice(start, end),
      count: filtered.length
    };
  }, [productsResponse?.data, selectedCategories, selectedIndustries, selectedBrands, currentPage, itemsPerPage]);

  // Manejar añadir al carrito sin causar refetch
  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    onAddToCart(product, quantity);
  }, [onAddToCart]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSearchParams(event.target.value ? { search: event.target.value } : {});
    setCurrentPage(1); // Reset a la primera página cuando se busca
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (type: 'category' | 'industry' | 'brand', value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategories(prev => prev.filter(cat => cat !== value));
        break;
      case 'industry':
        setSelectedIndustries(prev => prev.filter(ind => ind !== value));
        break;
      case 'brand':
        setSelectedBrands(prev => prev.filter(brand => brand !== value));
        break;
    }
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar productos: {(error as Error).message}</div>;
  }

  const uniqueCategories = Array.from(new Set(productsResponse?.data.map(product => product.category) || []));
  const brands = Array.from(new Set(productsResponse?.data.map(product => product.brand).filter(Boolean) || []));

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
            onIndustryChange={(industry) => {
              setSelectedIndustries(prev =>
                prev.includes(industry)
                  ? prev.filter(i => i !== industry)
                  : [...prev, industry]
              );
              setCurrentPage(1);
            }}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandChange={(brand) => {
              setSelectedBrands(prev =>
                prev.includes(brand)
                  ? prev.filter(b => b !== brand)
                  : [...prev, brand]
              );
              setCurrentPage(1);
            }}
            categories={uniqueCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={(category) => {
              setSelectedCategories(prev =>
                prev.includes(category)
                  ? prev.filter(c => c !== category)
                  : [...prev, category]
              );
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Category Pills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategories(prev =>
                      prev.includes(category)
                        ? prev.filter(c => c !== category)
                        : [...prev, category]
                    );
                  }}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-colors duration-200
                    ${selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.data.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Pagination */}
          {filteredProducts && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProducts.count / itemsPerPage)}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
