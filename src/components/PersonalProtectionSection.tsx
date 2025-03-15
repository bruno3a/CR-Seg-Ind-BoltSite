import React, { useState } from 'react';
import './PersonalProtectionSection.css';

interface Category {
  id: number;
  name: string;
  area: string;
  top: string;
  left: string;
}

const categories: Category[] = [
  { id: 1, name: 'Cascos', area: 'head', top: '9%', left: '45%' },
  { id: 2, name: 'Guantes', area: 'hands', top: '50%', left: '50%' },
  { id: 3, name: 'Chalecos', area: 'torso', top: '30%', left: '45%' },
  { id: 4, name: 'Botas', area: 'feet', top: '80%', left: '40%' },
  { id: 5, name: 'Protección Ocular', area: 'head', top: '14%', left: '45%' },
  { id: 6, name: 'Protección Respiratoria', area: 'head', top: '18%', left: '45%' },
  { id: 7, name: 'Protección Auditiva', area: 'head', top: '15%', left: '50%' },
  { id: 8, name: 'Protección Facial', area: 'head', top: '14%', left: '40%' },
];

const PersonalProtectionSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  return (
    <section className="w-3/5 bg-gradient-to-b from-gray-100 to-gray-50 py-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Equipos de Protección Personal
      </h2>
      <div className="image-container relative max-w-[800px] mx-auto">
        <img 
          src="/Public/mameluco.jpg" 
          alt="Figura Humana" 
          className="w-full" 
          style={{ marginTop: '-2rem' }} // Ajusta este valor según necesites
        />
        {categories.map((category) => (
          <div
            key={category.id}
            className="absolute w-10 h-10 bg-blue-500 opacity-50 cursor-pointer hotspot"
            style={{ top: category.top, left: category.left }}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          />
        ))}
        {hoveredCategory && (
          <div className="absolute bg-white border p-2 shadow-md tooltip" 
               style={{ top: hoveredCategory.top, left: `calc(${hoveredCategory.left} + 2rem)` }}>
            <p>{hoveredCategory.name}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalProtectionSection;
