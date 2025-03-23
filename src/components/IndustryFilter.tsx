import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface IndustryFilterProps {
    allIndustries: Array<{ name: string }>;
    selectedIndustries: string[];
    onIndustryChange: (industry: string) => void;
    brands: string[];
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
}

interface FilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    items: string[];
    selectedItems: string[];
    onItemChange: (item: string) => void;
    searchTerm: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    isOpen,
    onToggle,
    items = [], // Provide default empty array
    selectedItems = [], // Provide default empty array
    onItemChange,
    searchTerm = '' // Provide default empty string
}) => {
    const filteredItems = useMemo(() => {
        if (!items) return [];
        return items.filter(item => 
            item?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    return (
        <div className="mt-4">
            <button
                className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                onClick={onToggle}
            >
                <span className="text-sm">{title}</span>
                <div className="flex items-center">
                    {selectedItems.length > 0 && (
                        <span className="mr-2 text-xs text-amber-600">
                            ({selectedItems.length})
                        </span>
                    )}
                    <ChevronDown 
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    />
                </div>
            </button>
            {isOpen && (
                <div className="mt-1 max-h-40 overflow-y-auto custom-scrollbar">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <label
                                key={item}
                                className="flex items-center py-1 px-2 hover:bg-gray-50 rounded cursor-pointer text-xs"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item)}
                                    onChange={() => onItemChange(item)}
                                    className="w-3 h-3 text-amber-600 rounded border-gray-300"
                                />
                                <span className="ml-2 text-gray-700">{item}</span>
                            </label>
                        ))
                    ) : (
                        <div className="text-xs text-gray-500 py-2 px-2">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const IndustryFilter: React.FC<IndustryFilterProps> = ({
    allIndustries = [], // Provide default empty array
    selectedIndustries = [], // Provide default empty array
    onIndustryChange,
    brands = [], // Provide default empty array
    selectedBrands = [], // Provide default empty array
    onBrandChange,
    categories = [], // Provide default empty array
    selectedCategories = [], // Provide default empty array
    onCategoryChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isIndustryOpen, setIsIndustryOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

    const clearFilters = () => {
        // Limpiar industrias
        selectedIndustries.forEach(industry => onIndustryChange(industry));
        // Limpiar marcas
        selectedBrands.forEach(brand => onBrandChange(brand));
        // Limpiar categorías
        selectedCategories.forEach(category => onCategoryChange(category));
        // Resetear búsqueda
        setSearchTerm('');
    };

    const hasActiveFilters = selectedIndustries.length > 0 || 
                           selectedBrands.length > 0 || 
                           selectedCategories.length > 0;

    return (
        <div className="w-72 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4">
                {/* Header y Búsqueda */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Limpiar
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar en filtros..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                </div>

                {/* Secciones de Filtros */}
                <FilterSection
                    title="Categorías"
                    isOpen={isCategoriesOpen}
                    onToggle={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    items={categories}
                    selectedItems={selectedCategories}
                    onItemChange={onCategoryChange}
                    searchTerm={searchTerm}
                />

                <FilterSection
                    title="Marcas"
                    isOpen={isBrandsOpen}
                    onToggle={() => setIsBrandsOpen(!isBrandsOpen)}
                    items={brands}
                    selectedItems={selectedBrands}
                    onItemChange={onBrandChange}
                    searchTerm={searchTerm}
                />

                <FilterSection
                    title="Industrias"
                    isOpen={isIndustryOpen}
                    onToggle={() => setIsIndustryOpen(!isIndustryOpen)}
                    items={allIndustries.map(i => i.name)}
                    selectedItems={selectedIndustries}
                    onItemChange={onIndustryChange}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    );
};

export default IndustryFilter;
