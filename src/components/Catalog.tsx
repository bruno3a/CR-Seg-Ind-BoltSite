import React, { useState, useEffect, useCallback } from 'react';
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
      .select('*', { count: 'exact' });

    if (search) {
      query = query.textSearch('name', search, {
        config: 'english',
        type: 'websearch'
      });
    }

    if (categories?.length) query = query.in('category', categories);
    if (industries?.length) query = query.in('industry', industries);
    if (brands?.length) query = query.in('brand', brands);

    query = query.range(start, end);

    const { data, error, count } = await query;
    
    if (error) throw error;

    const validatedData = data.map(product => {
      const result = ProductSchema.safeParse(product);
      if (!result.success) {
        console.error('Invalid product data:', result.error);
        return null;
      }
      return result.data;
    }).filter((product): product is Product => product !== null);

    return {
      data: validatedData,
      count: count || 0
    };
  }, []);

  // React Query hook con configuración optimizada
  const {
    data: productsResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['products', search, selectedCategories, selectedIndustries, selectedBrands, currentPage, itemsPerPage],
    queryFn: () => fetchProducts({
      search,
      categories: selectedCategories,
      industries: selectedIndustries,
      brands: selectedBrands,
      page: currentPage,
      itemsPerPage
    }),
    staleTime: 5 * 60 * 1000, // Cache válido por 5 minutos
    keepPreviousData: true,
    // Añadir estas opciones para evitar refetch innecesarios
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  // Modificar el prefetch para que solo se ejecute si es necesario
  useEffect(() => {
    if (productsResponse?.count && currentPage * itemsPerPage < productsResponse.count) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['products', search, selectedCategories, selectedIndustries, selectedBrands, nextPage, itemsPerPage],
        queryFn: () => fetchProducts({
          search,
          categories: selectedCategories,
          industries: selectedIndustries,
          brands: selectedBrands,
          page: nextPage,
          itemsPerPage
        }),
        staleTime: 5 * 60 * 1000
      });
    }
  }, [currentPage, productsResponse?.count]);

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
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productsResponse?.data.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Pagination */}
          {productsResponse && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(productsResponse.count / itemsPerPage)}
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
