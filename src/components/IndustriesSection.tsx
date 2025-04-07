import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { industries, iconMap } from '../utils';
import './IndustriesSection.css';

const IndustriesSection = () => {
    const duplicatedIndustries = [...industries, ...industries, ...industries]; // Triplicamos para asegurar suficiente contenido
    const [scrollPosition, setScrollPosition] = useState(0);
    const CARD_HEIGHT = 68; // Aumentado 50% (de 45px a 68px)
    const TOTAL_ROWS = 11; // Reducido de 13 a 11 filas

    useEffect(() => {
        const scrollSpeed = 1.5; // Aumentado 50% (de 1 a 1.5)
        const animationDuration = 50; // ms between frames
        
        const animate = () => {
            setScrollPosition((prevPosition) => {
                const newPosition = prevPosition + scrollSpeed;
                // Reset cuando el scroll llega al tamaño de un set completo de industrias
                if (newPosition >= (industries.length * CARD_HEIGHT)) {
                    return 0;
                }
                return newPosition;
            });
        };

        const intervalId = setInterval(animate, animationDuration);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex justify-center w-full">
            <section className="w-4/5 py-8 bg-gradient-to-b from-gray-100 to-gray-50">
                <div className="px-4">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Industrias que Servimos
                        </h2>
                    </div>

                    <div className="relative h-[748px] overflow-hidden industries-carousel"> {/* 11 filas * 68px */}
                        <div 
                            className="absolute w-full"
                            style={{
                                transform: `translateY(-${scrollPosition}px)`,
                                transition: 'transform 0.5s linear'
                            }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {duplicatedIndustries.map((industry, index) => {
                                    const Icon = iconMap[industry.name] || Users;
                                    
                                    return (
                                        <div
                                            key={`${industry.name}-${index}`}
                                            className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white"
                                            style={{ height: `${CARD_HEIGHT}px` }}
                                        >
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                style={{ 
                                                    backgroundImage: `url(${industry.image})`,
                                                    backgroundColor: '#f3f4f6'
                                                }}
                                            />
                                            
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
                                            
                                            <div className="relative h-full px-6 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-white truncate">
                                                    {industry.name}
                                                </h3>
                                                <Icon className="w-6 h-6 text-blue-400 flex-shrink-0 ml-4" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IndustriesSection;
