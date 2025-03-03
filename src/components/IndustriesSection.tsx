import React from 'react';
import { Users } from 'lucide-react';
import { industries, iconMap } from '../utils';

const IndustriesSection = () => {
    return (
        <section className="py-16 bg-gray-50">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {industries.map((industry, index) => {
                        const Icon = iconMap[industry.name] || Users;
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-transform hover:-translate-y-1"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${industry.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                <div className="relative p-6 h-48 flex flex-col justify-end">
                                    <div className="mb-4">
                                        <Icon className="w-6 h-6 text-blue-400 mb-2" />
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {industry.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {industry.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-300">
                                            Learn More →
                                        </button>
                                    </div>
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
