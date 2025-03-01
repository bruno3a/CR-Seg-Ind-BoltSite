import React, { useState } from 'react';
import { industries } from '../utils';

interface Industry {
    name: string;
    description: string;
    image: string;
}
interface IndustryFilterProps {
    allIndustries: Industry[];
    selectedIndustries: string[];
    onIndustryChange: (industryName: string) => void;
}

const IndustryFilter: React.FC<IndustryFilterProps> = ({
    allIndustries,
    selectedIndustries,
    onIndustryChange,
}) => {
    // Simulate admin-selected industries (replace with actual logic if needed)
    const adminSelectedIndustries = [
        "AERONAUTICA",
        "AGRICOLA",
        "ALIMENTICIA",
        "AUTOMOTRIZ",
        "AUTOPARTISTA",
        "AVICOLA",
        "CARPINTERIA"
    ];

    const [showAll, setShowAll] = useState(false);

    const visibleIndustries = showAll
        ? allIndustries
        : allIndustries.filter((industry) => adminSelectedIndustries.includes(industry.name));

    const remainingIndustries = allIndustries.filter(
        (industry) => !adminSelectedIndustries.includes(industry.name)
    );
    return (
        <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Industrias</h2>
            <ul>
                {visibleIndustries.map((industry) => (
                    <li
                        key={industry.name}
                        className={`cursor-pointer py-2 px-4 rounded-md mb-1 ${selectedIndustries.includes(industry.name)
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-200'
                            }`}
                        onClick={() => onIndustryChange(industry.name)}
                    >
                        {industry.name}
                    </li>
                ))}
                {remainingIndustries.length > 0 && (
                    <div className="overflow-y-auto max-h-40">
                        {remainingIndustries.map((industry) => (
                            <li
                                key={industry.name}
                                className={`cursor-pointer py-2 px-4 rounded-md mb-1 ${selectedIndustries.includes(industry.name)
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200'
                                    }`}
                                onClick={() => onIndustryChange(industry.name)}
                            >
                                {industry.name}
                            </li>
                        ))}
                    </div>
                )}
            </ul>
            {/* <button
        onClick={() => setShowAll(!showAll)}
        className="text-blue-500 hover:text-blue-700 mt-2"
      >
        {showAll ? 'Mostrar menos' : 'Mostrar todas'}
      </button> */}
        </div>
    );
};

export default IndustryFilter;
