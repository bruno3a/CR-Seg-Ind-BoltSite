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
  { id: 1, name: 'Cascos', area: 'head', top: '20%', left: '18%' },
  { id: 2, name: 'Guantes', area: 'hands', top: '63%', left: '82%' },
  { id: 3, name: 'Chalecos', area: 'torso', top: '63%', left: '18%' },
  { id: 4, name: 'Botas', area: 'feet', top: '85%', left: '82%' },
  { id: 5, name: 'Protección Ocular', area: 'head', top: '38%', left: '18%' },
  { id: 6, name: 'Protección Respiratoria', area: 'head', top: '20%', left: '82%' },
  { id: 7, name: 'Protección Auditiva', area: 'head', top: '42%', left: '82%' },
  { id: 8, name: 'Protección Facial', area: 'head', top: '46%', left: '18%' },
  { id: 9, name: 'Indumentaria', area: 'body', top: '84%', left: '18%' },
];

const PersonalProtectionSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  return (
    <section className="w-3/5 bg-gradient-to-b from-gray-100 to-gray-50 py-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Elementos de Protección Personal
      </h2>
      <div className="image-container relative max-w-[800px] mx-auto">
        <img 
          src="/Public/EPP2.png" 
          alt="Figura Humana con Elementos de Protección Personal" 
          className="w-[80%] h-auto" 
          style={{ marginTop: '-1rem' }}
        />
        {categories.map((category) => (
          <div
            key={category.id}
            className="absolute w-[80px] h-[80px] bg-blue-500 opacity-15 cursor-pointer hotspot"
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
