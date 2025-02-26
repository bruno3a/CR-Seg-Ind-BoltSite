import React, { useState, useEffect } from 'react';
import { Shield, Camera, Lock, Fingerprint, Bell, Radio, Eye, Building2, User, Warehouse } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import WhatsAppButton from './components/WhatsAppButton';
import Pictogram from './components/Pictogram';
import IndustriesSection from './components/IndustriesSection';
import Cart from './components/Cart';
import WelcomePopup from './components/WelcomePopup';

const products = [
  {
    id: 1,
    name: "Advanced CCTV System",
    description: "4K resolution security cameras with night vision and motion detection",
    icon: Camera,
    price: "$1,299",
    category: "Surveillance"
  },
  {
    id: 2,
    name: "Biometric Access Control",
    description: "Multi-factor authentication system with fingerprint and facial recognition",
    icon: Fingerprint,
    price: "$2,499",
    category: "Access Control"
  },
  {
    id: 3,
    name: "Perimeter Alarm System",
    description: "Advanced motion sensors with real-time alerts and mobile integration",
    icon: Bell,
    price: "$1,899",
    category: "Alarms"
  },
  {
    id: 4,
    name: "Industrial Security Gates",
    description: "Heavy-duty electric gates with remote access control",
    icon: Lock,
    price: "$3,999",
    category: "Physical Security"
  },
  {
    id: 5,
    name: "Two-Way Radio System",
    description: "Long-range communication system for security personnel",
    icon: Radio,
    price: "$899",
    category: "Communication"
  },
  {
    id: 6,
    name: "Surveillance Analytics",
    description: "AI-powered video analytics for threat detection",
    icon: Eye,
    price: "$1,599",
    category: "Software"
  }
];

function App() {
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; price: string; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleWelcomeSubmit = (data: { companyType: string; industry: string }) => {
    console.log('Welcome data:', data);
    // Here you could send this data to your analytics or CRM system
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartItemsCount={cartItems.length} />
      <Hero />
      
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Pictogram
              icon={User}
              title="Personal Safety Solutions"
              description="Comprehensive personal protection equipment and systems for individual security"
              stats={[
                { label: "Protected Users", value: "50K+" },
                { label: "Success Rate", value: "99.9%" }
              ]}
              image="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            />
            <Pictogram
              icon={Warehouse}
              title="Warehouse Security"
              description="Advanced security systems designed specifically for warehouse and storage facilities"
              stats={[
                { label: "Secured Space", value: "2M+ sqft" },
                { label: "Incident Prevention", value: "98%" }
              ]}
              image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Solutions Catalog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of industrial security products designed to protect
              your facilities and assets with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </section>

        <IndustriesSection />

        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600">Industry-leading security solutions for your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Proven Protection",
                description: "Trusted by leading industries worldwide"
              },
              {
                icon: Building2,
                title: "Enterprise Grade",
                description: "Built for industrial applications"
              },
              {
                icon: Lock,
                title: "Advanced Security",
                description: "Latest security technologies"
              },
              {
                icon: Bell,
                title: "24/7 Support",
                description: "Round-the-clock technical assistance"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Leading provider of industrial security solutions with over 20 years of experience.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: info@securitysolutions.com</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-white">Products</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Services</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <WelcomePopup
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onSubmit={handleWelcomeSubmit}
      />

      <WhatsAppButton />
    </div>
  );
}

export default App;