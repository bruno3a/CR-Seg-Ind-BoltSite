import React from 'react';

const Nosotros = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Historia</h1>
        <div className="w-20 h-1 bg-amber-400 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Text Content - Ahora ocupa aproximadamente 40% */}
        <div className="lg:w-[70%] space-y-6">
          <p className="text-lg text-gray-700">
            CR Work nace como resultado de la visión emprendedora de sus fundadores, 
            quienes identificaron la necesidad de brindar soluciones integrales en seguridad industrial 
            con un enfoque personalizado y profesional.
          </p>
          <p className="text-lg text-gray-700">
            Con más de una década de experiencia en el mercado, nos hemos consolidado como un 
            referente en la provisión de equipos de protección personal y seguridad industrial, 
            sirviendo a empresas de diversos sectores en toda la región.
          </p>
          <p className="text-lg text-gray-700">
            Nuestro compromiso con la calidad se refleja en la cuidadosa selección de las marcas 
            que representamos, trabajando únicamente con los fabricantes más reconocidos del mercado.
          </p>
        </div>
        
        {/* Main Warehouse Image - Ahora ocupa aproximadamente 60% */}
        <div className="lg:w-[30%] rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://static3.depositphotos.com/1000847/128/i/450/depositphotos_1289753-stock-photo-industrial-warehouse.jpg"
            alt="Nuestro Depósito"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Facilities Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestras Instalaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Placeholders - Aquí irán las fotos del depósito */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-gray-200 rounded-xl overflow-hidden">
              <div className="aspect-w-4 aspect-h-3 w-full">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Foto {index} del Depósito
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-amber-600">Compromiso</h3>
            <p className="text-gray-700">
              Nos dedicamos a proporcionar las mejores soluciones en seguridad industrial, 
              garantizando la satisfacción total de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-amber-600">Calidad</h3>
            <p className="text-gray-700">
              Trabajamos exclusivamente con las marcas más reconocidas del mercado, 
              asegurando productos de la más alta calidad.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-amber-600">Servicio</h3>
            <p className="text-gray-700">
              Brindamos asesoramiento técnico especializado para garantizar que cada cliente 
              encuentre la solución perfecta para sus necesidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;

