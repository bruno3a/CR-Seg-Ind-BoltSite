import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Conocenos = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conocenos</h1>
        <div className="w-20 h-1 bg-amber-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Map Section - Ahora con altura completa */}
        <div className="rounded-xl overflow-hidden shadow-lg h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.199684432781!2d-58.79497262341577!3d-34.66270527298277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc62b29c32a1b%3A0x9f1f8c3e6e0b7b9d!2sMerlo%202338%2C%20B1744OEJ%20Moreno%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1711039168421!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '600px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Dirección</h3>
                <p className="text-gray-600">Merlo 2338, Moreno, Buenos Aires</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Teléfono</h3>
                <p className="text-gray-600">0237-4636894</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">ventas@crseguridad.com</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Horarios</h3>
                <p className="text-gray-600">Lunes a Viernes 8:30 a 17hs</p>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Nuestra empresa nace a partir del emprendimiento de sus dos socios, con la finalidad de brindar a sus clientes más de 10 años de experiencia en el mercado de la seguridad industrial.
              </p>
              <p>
                Con una gran responsabilidad y vocación de servicio, "CR seguridad industrial" responde las más exigentes demandas de la industria en general. Esta tarea se logra a través de la comercialización de productos de alta gama, priorizando el servicio y el asesoramiento técnico a empresas de primera línea a nivel nacional.
              </p>
              <p>
                Representamos a las mejores marcas del país, como ser: MSA, 3M, Musitani, Dupont, Ombu, Grafa 70, Gaucho, Pardo, ATT, Libus, Martor entre otras tantas.
              </p>
              <p>
                Nos capacitamos periódicamente para brindar asesoramiento técnico profesional para que su empresa tenga la mejor relación costo / beneficio de cada uno de los productos que le recomendamos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conocenos;
