import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PictogramProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  image: string;
}

const Pictogram: React.FC<PictogramProps> = ({ icon: Icon, title, description, stats, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${image})`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      
      <div className="relative p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-200 mb-6">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pictogram;