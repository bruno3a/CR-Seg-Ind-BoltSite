import React from 'react';
import {
  Factory,
  Building2,
  Warehouse,
  Guitar,
  Ban,
  School,
  ShoppingBag,
  Plane,
  Users,
  Truck,
  Palette,
  Shirt,
  Building,
  Cpu,
  Wheat,
  LandPlot,
  Sailboat,
  Construction,
  Paintbrush2,
  FlaskConical,
  HeartPulse,
  Boxes,
  Database,
  Hammer,
  Wrench,
  Newspaper,
  Fish,
  Fuel,
  PaintRoller,
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  AERONAUTICA: Plane,
  AGRICOLA: Wheat,
  ALIMENTICIA: ShoppingBag,
  AUTOMOTRIZ: Truck,
  AUTOPARTISTA: Wrench,
  AVICOLA: Ban,
  CARPINTERIA: Hammer,
  CEMENTERA: Building,
  CONSTRUCCION: Construction,
  VIALIDAD: LandPlot,
  ELECTRICA: Cpu,
  ELECTRONICA: Cpu,
  FARMACEUTICA: HeartPulse,
  FERRETERIA: Hammer,
  FRIGORIFICA: Warehouse,
  FRIGORIFICO: Warehouse,
  GAS: Fuel,
  LABORATORIO: FlaskConical,
  LIMPIEZA: Paintbrush2,
  LOGISTICA: Boxes,
  MANUFACTURA: Factory,
  METALMECANICA: Wrench,
  METALURRGICA: Factory,
  MINERA: Construction,
  NAVIERA: Sailboat,
  PAPELERA: Newspaper,
  PESQUERA: Fish,
  PETROLEO: Fuel,
  PETROLERA: Fuel,
  PETROQUIMICA: Fuel,
  PINTURA: PaintRoller,
  QUIMICA: FlaskConical,
  SALUD: HeartPulse,
  SIDERURGICA: Factory,
  SOLDADURA: Wrench,
  TABACALERA: Ban,
  TRANSPORTE: Truck,
};

const industries = [
    {
        name: 'AERONAUTICA',
        description: 'Soluciones de seguridad para la industria aeronáutica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'AGRICOLA',
        description: 'Soluciones de seguridad para la industria agrícola.',
        image: '/placeholder.jpg',
    },
    {
        name: 'ALIMENTICIA',
        description: 'Soluciones de seguridad para la industria alimenticia.',
        image: '/placeholder.jpg',
    },
    {
        name: 'AUTOMOTRIZ',
        description: 'Soluciones de seguridad para la industria automotriz.',
        image: '/placeholder.jpg',
    },
    {
        name: 'AUTOPARTISTA',
        description: 'Soluciones de seguridad para la industria autopartista.',
        image: '/placeholder.jpg',
    },
    {
        name: 'AVICOLA',
        description: 'Soluciones de seguridad para la industria avícola.',
        image: '/placeholder.jpg',
    },
    {
        name: 'CARPINTERIA',
        description: 'Soluciones de seguridad para carpinterías.',
        image: '/placeholder.jpg',
    },
    {
        name: 'CEMENTERA',
        description: 'Soluciones de seguridad para la industria cementera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'CONSTRUCCION',
        description: 'Soluciones de seguridad para la industria de la construcción.',
        image: '/placeholder.jpg',
    },
    {
        name: 'VIALIDAD',
        description: 'Soluciones de seguridad para la industria de vialidad.',
        image: '/placeholder.jpg',
    },
    {
        name: 'ELECTRICA',
        description: 'Soluciones de seguridad para la industria eléctrica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'ELECTRONICA',
        description: 'Soluciones de seguridad para la industria electrónica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'FARMACEUTICA',
        description: 'Soluciones de seguridad para la industria farmacéutica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'FERRETERIA',
        description: 'Soluciones de seguridad para ferreterías.',
        image: '/placeholder.jpg',
    },
    {
        name: 'FRIGORIFICA',
        description: 'Soluciones de seguridad para la industria frigorífica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'FRIGORIFICO',
        description: 'Soluciones de seguridad para frigoríficos.',
        image: '/placeholder.jpg',
    },
    {
        name: 'GAS',
        description: 'Soluciones de seguridad para la industria del gas.',
        image: '/placeholder.jpg',
    },
    {
        name: 'LABORATORIO',
        description: 'Soluciones de seguridad para laboratorios.',
        image: '/placeholder.jpg',
    },
    {
        name: 'LIMPIEZA',
        description: 'Soluciones de seguridad para la industria de la limpieza.',
        image: '/placeholder.jpg',
    },
    {
        name: 'LOGISTICA',
        description: 'Soluciones de seguridad para la industria logística.',
        image: '/placeholder.jpg',
    },
    {
        name: 'MANUFACTURA',
        description: 'Soluciones de seguridad para la industria manufacturera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'METALMECANICA',
        description: 'Soluciones de seguridad para la industria metalmecánica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'METALURGICA',
        description: 'Soluciones de seguridad para la industria metalúrgica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'MINERA',
        description: 'Soluciones de seguridad para la industria minera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'MINERIA',
        description: 'Soluciones de seguridad para la industria minera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'NAVIERA',
        description: 'Soluciones de seguridad para la industria naviera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PAPELERA',
        description: 'Soluciones de seguridad para la industria papelera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PESQUERA',
        description: 'Soluciones de seguridad para la industria pesquera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PETROLEO',
        description: 'Soluciones de seguridad para la industria del petróleo.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PETROLERA',
        description: 'Soluciones de seguridad para la industria petrolera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PETROQUIMICA',
        description: 'Soluciones de seguridad para la industria petroquímica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'PINTURA',
        description: 'Soluciones de seguridad para la industria de la pintura.',
        image: '/placeholder.jpg',
    },
    {
        name: 'QUIMICA',
        description: 'Soluciones de seguridad para la industria química.',
        image: '/placeholder.jpg',
    },
    {
        name: 'SALUD',
        description: 'Soluciones de seguridad para el sector salud.',
        image: '/placeholder.jpg',
    },
    {
        name: 'SIDERURGICA',
        description: 'Soluciones de seguridad para la industria siderúrgica.',
        image: '/placeholder.jpg',
    },
    {
        name: 'SOLDADURA',
        description: 'Soluciones de seguridad para la industria de la soldadura.',
        image: '/placeholder.jpg',
    },
    {
        name: 'TABACALERA',
        description: 'Soluciones de seguridad para la industria tabacalera.',
        image: '/placeholder.jpg',
    },
    {
        name: 'TRANSPORTE',
        description: 'Soluciones de seguridad para la industria del transporte.',
        image: '/placeholder.jpg',
    },
    {
        name: 'VIALIDAD',
        description: 'Soluciones de seguridad para la industria de vialidad.',
        image: '/placeholder.jpg',
    },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="relative p-6 h-64 flex flex-col justify-end">
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-blue-400 mb-2" />
                    <h3 className="text-xl font-semibold text-white mb-2">
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
