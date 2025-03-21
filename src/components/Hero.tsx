import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[600px]"
      style={{
        backgroundImage:
          "url('https://mla-s1-p.mlstatic.com/D_NQ_NP_773577-MLA41041719255_032020-OO.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Insumos para la Seguridad y Señalización de todas las Industrias
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Protege tus instalaciones con sistemas de seguridad de última
            generación diseñados para aplicaciones industriales.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/catalog"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Ver Catálogo
            </Link>
            <a 
              href="mailto:ventas@crseguridad.com"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
            >
              Contactanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero
