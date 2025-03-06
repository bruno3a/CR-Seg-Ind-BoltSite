import React from 'react';
import { Users } from 'lucide-react';
import { industries, iconMap } from '../utils';

const IndustriesSection = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Industrias que Servimos
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Soluciones de seguridad personalizadas para diversas industrias,
                        asegurando protección y tranquilidad en todos los sectores.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {industries.map((industry, index) => {
                        const Icon = iconMap[industry.name] || Users;
                        
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                style={{ height: '180px' }}
                            >
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ 
                                        backgroundImage: `url(${industry.image})`,
                                        backgroundColor: '#f3f4f6'
                                    }}
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                                
                                <div className="relative h-full p-3 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-base md:text-lg font-bold text-white leading-tight max-w-[80%]">
                                            {industry.name}
                                        </h3>
                                        <Icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                    </div>
                                    
                                    <p className="text-xs text-gray-300 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                                        {industry.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default IndustriesSection;
