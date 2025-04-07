import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductFilters, PaginatedResponse, Product } from '../types';
import { z } from 'zod';
import ProductCard from './ProductCard';
import { industries } from '../utils';
import IndustryFilter from './IndustryFilter';
import { Search, Badge, ChevronDown } from 'lucide-react';
import Pagination from './Pagination';
import { X } from 'lucide-react';

// Schema validation
export const ProductSchema = z.object({
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
  // 1. All useState hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 2. Query client
  const queryClient = useQueryClient();

  // 3. Fetch products function
  const fetchProducts = useCallback(async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { search } = filters;
    try {
      console.log('Fetching products with search:', search);
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error, count } = await query;
      console.log('Supabase response:', { data, error, count });

      if (error) throw error;
      if (!data) return { data: [], count: 0 };

      const transformedProducts = data.map(product => ({
        ...product,
        categories: Array.isArray(product.categories) ? product.categories : [product.category],
        industry: product.industry || null,
        brand: product.brand || null,
        price: typeof product.price === 'number' ? product.price.toString() : product.price
      }));

      console.log('Transformed products:', transformedProducts);
      return {
        data: transformedProducts,
        count: count || transformedProducts.length
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { data: [], count: 0 };
    }
  }, []);

  // 4. Query hook
  const {
    data: productsResponse,
    isLoading,
    error,
    isFetching
  } = useQuery({
    queryKey: ['products', searchParams.get('search')], // Cambiar search por searchParams.get('search')
    queryFn: () => fetchProducts({
      search: searchParams.get('search') || '', // Usar searchParams directamente
      categories: selectedCategories,
      industries: selectedIndustries,
      brands: selectedBrands,
      page: currentPage,
      itemsPerPage
    }),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });

  // 5. Memoized values
  const filteredProducts = useMemo(() => {
    if (!productsResponse?.data) return { data: [], count: 0 };

    let filtered = [...productsResponse.data];

    // Filtrar por búsqueda local
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.some(cat => product.categories.includes(cat))
      );
    }

    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(product => 
        product.industry && selectedIndustries.includes(product.industry)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    return {
      data: filtered.slice(start, end),
      count: filtered.length
    };
  }, [productsResponse?.data, search, selectedCategories, selectedIndustries, selectedBrands, currentPage, itemsPerPage]);

  // 6. Debug effect
  useEffect(() => {
    console.log('Current state:', {
      productsResponse,
      isLoading,
      error,
      isFetching,
      filteredProducts
    });
  }, [productsResponse, isLoading, error, isFetching, filteredProducts]);

  const uniqueCategories = useMemo(() => {
    if (!productsResponse?.data) return [];
    return Array.from(new Set(
      productsResponse.data.flatMap((product: Product) => product.categories)
    )) as string[];
  }, [productsResponse?.data]);

  const uniqueBrands = useMemo(() => {
    if (!productsResponse?.data) return [];
    return Array.from(new Set(
      productsResponse.data
        .map(product => product.brand)
        .filter(Boolean)
    ));
  }, [productsResponse?.data]);

  // 6. Event handlers
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    // No actualizar searchParams aquí
  }, []);

  const handleIndustryChange = useCallback((industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
    setCurrentPage(1);
  }, []);

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset a la primera página cuando cambia el número de items por página
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-red-500">
          Error al cargar productos: {(error as Error).message}
        </div>
      </div>
    );
  }

  // Verificar si tenemos datos antes de renderizar
  const hasProducts = productsResponse?.data && productsResponse.data.length > 0;
  const displayProducts = filteredProducts?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra superior con búsqueda y botón de filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden px-4 py-2 bg-gray-100 rounded-lg flex items-center justify-center"
        >
          <span className="mr-2">Filtros</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Modal de filtros para móvil */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <IndustryFilter
                  allIndustries={industries}
                  selectedIndustries={selectedIndustries}
                  onIndustryChange={handleIndustryChange}
                  brands={uniqueBrands}
                  selectedBrands={selectedBrands}
                  onBrandChange={handleBrandChange}
                  categories={uniqueCategories}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                  isMobile={true}
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-2 bg-amber-600 text-white rounded-lg"
                >
                  Ver resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-4">
            <IndustryFilter
              allIndustries={industries}
              selectedIndustries={selectedIndustries}
              onIndustryChange={handleIndustryChange}
              brands={uniqueBrands}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              categories={uniqueCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </aside>

        {/* Grid de productos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((filteredProducts?.count || 0) / itemsPerPage)}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
