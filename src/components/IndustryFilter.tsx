import React, { useState } from 'react';
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

const IndustryFilter: React.FC<IndustryFilterProps> = ({
    allIndustries,
    selectedIndustries,
    onIndustryChange,
    brands,
    selectedBrands,
    onBrandChange,
    categories,
    selectedCategories,
    onCategoryChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isIndustryOpen, setIsIndustryOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

    const filteredItems = (items: string[]) =>
        items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const clearFilters = () => {
        selectedIndustries.forEach(industry => onIndustryChange(industry));
        selectedBrands.forEach(brand => onBrandChange(brand));
        selectedCategories.forEach(category => onCategoryChange(category));
        setSearchTerm('');
    };

    return (
        <div className="w-72 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4">
                {/* Header with search */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
                        {(selectedIndustries.length > 0 || selectedBrands.length > 0 || selectedCategories.length > 0) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
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
                            placeholder="Buscar filtros..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md"
                        />
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mt-4">
                    <button
                        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    >
                        <span className="text-sm">Categorías</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isCategoriesOpen && (
                        <div className="mt-1 max-h-40 overflow-y-auto custom-scrollbar">
                            {filteredItems(categories).map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center py-1 px-2 hover:bg-gray-50 rounded cursor-pointer text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => onCategoryChange(category)}
                                        className="w-3 h-3 text-blue-600 rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Brands Section */}
                <div className="mt-4">
                    <button
                        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                        onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    >
                        <span className="text-sm">Marcas</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isBrandsOpen && (
                        <div className="mt-1 max-h-40 overflow-y-auto custom-scrollbar">
                            {filteredItems(brands).map((brand) => (
                                <label
                                    key={brand}
                                    className="flex items-center py-1 px-2 hover:bg-gray-50 rounded cursor-pointer text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => onBrandChange(brand)}
                                        className="w-3 h-3 text-amber-600 rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">{brand}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Industries Section */}
                <div className="mt-4">
                    <button
                        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                        onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                    >
                        <span className="text-sm">Industrias</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isIndustryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isIndustryOpen && (
                        <div className="mt-1 max-h-40 overflow-y-auto custom-scrollbar">
                            {filteredItems(allIndustries.map(i => i.name)).map((industry) => (
                                <label
                                    key={industry}
                                    className="flex items-center py-1 px-2 hover:bg-gray-50 rounded cursor-pointer text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIndustries.includes(industry)}
                                        onChange={() => onIndustryChange(industry)}
                                        className="w-3 h-3 text-blue-600 rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">{industry}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndustryFilter;
