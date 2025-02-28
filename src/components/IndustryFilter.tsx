import React from 'react';

interface IndustryFilterProps {
  allIndustries: string[];
  selectedIndustries: string[];
  onIndustryChange: (industry: string) => void;
}

const IndustryFilter: React.FC<IndustryFilterProps> = ({
  allIndustries,
  selectedIndustries,
  onIndustryChange,
}) => {
    
  const [randomIndustries, setRandomIndustries] = React.useState<string[]>([]);

    React.useEffect(() => {
        const shuffled = [...allIndustries].sort(() => 0.5 - Math.random());
        setRandomIndustries(shuffled.slice(0, 5));
    }, [allIndustries]);

  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Industrias</h2>
      <ul>
        {randomIndustries.map((industry) => (
          <li
            key={industry}
            className={`cursor-pointer py-2 px-4 rounded-md mb-1 ${
              selectedIndustries.includes(industry)
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => onIndustryChange(industry)}
          >
            {industry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryFilter;
