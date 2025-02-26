import React from 'react';
import { Factory, Building2, Warehouse, Guitar as Hospital, Ban as Bank, School, ShoppingBag, Plane } from 'lucide-react';

const industries = [
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Comprehensive security solutions for manufacturing facilities",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: Hospital,
    name: "Healthcare",
    description: "Advanced protection for medical facilities and equipment",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: Bank,
    name: "Financial",
    description: "High-security systems for banks and financial institutions",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: Warehouse,
    name: "Logistics",
    description: "Security solutions for warehouses and distribution centers",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: School,
    name: "Education",
    description: "Safe and secure environments for educational institutions",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: Building2,
    name: "Commercial",
    description: "Tailored security for office buildings and retail spaces",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: Plane,
    name: "Aviation",
    description: "Specialized security for airports and aviation facilities",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    description: "Comprehensive protection for retail establishments",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  }
];

const IndustriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tailored security solutions for diverse industries, ensuring protection and peace of mind across all sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
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
                  <industry.icon className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;