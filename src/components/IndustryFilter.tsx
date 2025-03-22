import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface Industry {
    name: string;
    description: string;
    image: string;
}

interface IndustryFilterProps {
    allIndustries: Industry[];
    selectedIndustries: string[];
    onIndustryChange: (industryName: string) => void;
    brands?: string[];
    selectedBrands?: string[];
    onBrandChange?: (brand: string) => void;
}

const IndustryFilter: React.FC<IndustryFilterProps> = ({
    allIndustries,
    selectedIndustries,
    onIndustryChange,
    brands = [],
    selectedBrands = [],
    onBrandChange = () => {},
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isIndustryOpen, setIsIndustryOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);

    const filteredIndustries = allIndustries.filter(industry =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clearFilters = () => {
        selectedIndustries.forEach(industry => onIndustryChange(industry));
        selectedBrands.forEach(brand => onBrandChange(brand));
        setSearchTerm('');
    };

    return (
        <div className="w-72 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
                    {(selectedIndustries.length > 0 || selectedBrands.length > 0) && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Search - Versión más compacta */}
                <div className="relative mb-4">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Brands - Ahora primero */}
                <div className="mb-6">
                    <button
                        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    >
                        <span>Marcas</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isBrandsOpen ? 'transform rotate-180' : ''
                            }`}
                        />
                    </button>
                    {isBrandsOpen && (
                        <div className="mt-2 space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                            {filteredBrands.map((brand) => (
                                <label
                                    key={brand}
                                    className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => onBrandChange(brand)}
                                        className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                                    />
                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Industries - Ahora segundo */}
                <div>
                    <button
                        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                    >
                        <span>Industrias</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isIndustryOpen ? 'transform rotate-180' : ''
                            }`}
                        />
                    </button>
                    {isIndustryOpen && (
                        <div className="mt-2 space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                            {filteredIndustries.map((industry) => (
                                <label
                                    key={industry.name}
                                    className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIndustries.includes(industry.name)}
                                        onChange={() => onIndustryChange(industry.name)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
                                        {industry.name}
                                    </span>
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
