import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Lock, Building2, User, Warehouse, Bell } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsAppButton from './components/WhatsAppButton';
import Pictogram from './components/Pictogram';
import IndustriesSection from './components/IndustriesSection';
import Cart from './components/Cart';
import WelcomePopup from './components/WelcomePopup';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import UserRegistration from './components/UserRegistration';
import BrandCarousel from './components/BrandCarousel';
import { Product, CartItem } from './types';
import { Routes, Route } from 'react-router-dom';

const API_URL = 'http://localhost:3010'; // Definir la URL de la API

const backgroundImageUrl = "https://mla-s1-p.mlstatic.com/D_NQ_NP_773577-MLA41041719255_032020-OO.webp";

interface NavbarProps {
  onCartClick: () => void;
  cartItemsCount: number;
  onClientLoginClick: () => void;
}

function App() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                if (!response.ok) {
                    throw new Error(`Error al obtener productos: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product, quantity: number) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === product._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) => {
            return quantity === 0
                ? prev.filter((item) => item._id !== id)
                : prev.map((item) => (item._id === id ? { ...item, quantity } : item));
        });
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    const handleWelcomeSubmit = (
        data: { companyType: string; industry: string }
    ) => {
        console.log('Welcome data:', data);
        // Here you could send this data to your analytics or CRM system
    };
    const handleLoginClick = () => {
        setIsAuthenticated(false); // Muestra el login
    };

  const ProductDetailWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${API_URL}/api/products/${id}`);
          if (!response.ok) {
            throw new Error(`Error al obtener el producto: ${response.statusText}`);
          }
          const data = await response.json();
          // Ensure the fetched data includes imageUrl and technicalSpecs
          const fetchedProduct = {
            ...data,
            imageUrl: data.imageUrl || 'https://via.placeholder.com/400', // Provide a default image URL if missing
            technicalSpecs: data.technicalSpecs || {
              'Specification 1': 'Value 1',
              'Specification 2': 'Value 2'
            }, // Provide default technical specs if missing
          };
          setProduct(fetchedProduct);
        } catch (error: any) {
          setError(error.message);
        }
      };

      if (id) {
        fetchProduct();
      }
    }, [id]);

    if (loading) {
      return <div>Loading product...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!product) {
      return <div>Product not found.</div>;
    }

    return <ProductDetail product={product} />;
  };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                onCartClick={() => setIsCartOpen(true)}
                cartItemsCount={cartItems.length}
                onClientLoginClick={handleLoginClick}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <BrandCarousel />
                            <main className="container mx-auto px-4 py-16">
                                <section className="mb-16">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                        <Pictogram
                                            icon={User}
                                            title="Personal Safety Solutions"
                                            description="Comprehensive personal protection equipment and systems for individual security"
                                            stats={[
                                                { label: 'Protected Users', value: '50K+' },
                                                { label: 'Success Rate', value: '99.9%' },
                                            ]}
                                            image="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        />
                                        <Pictogram
                                            icon={Warehouse}
                                            title="Warehouse Security"
                                            description="Advanced security systems designed specifically for warehouse and storage facilities"
                                            stats={[
                                                { label: 'Secured Space', value: '2M+ sqft' },
                                                { label: 'Incident Prevention', value: '98%' },
                                            ]}
                                            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        />
                                    </div>
                                </section>

                                <IndustriesSection />

                                <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                            Why Choose Us
                                        </h2>
                                        <p className="text-gray-600">
                                            Industry-leading security solutions for your business
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {[
                                            {
                                                icon: Shield,
                                                title: 'Excelencia en Servicio',
                                                description:
                                                    'Cientos de empresas líderes confían en nosotros',
                                            },
                                            {
                                                icon: Building2,
                                                title: 'Enterprise Grade',
                                                description: 'Built for industrial applications',
                                            },
                                            {
                                                icon: Lock,
                                                title: 'Advanced Security',
                                                description: 'Latest security technologies',
                                            },
                                            {
                                                icon: Bell,
                                                title: '24/7 Support',
                                                description: 'Round-the-clock technical assistance',
                                            },
                                        ].map((feature, index) => (
                                            <div key={index} className="text-center">
                                                <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                                                    <feature.icon className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600">{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </main>
                        </>
                    }
                />
                <Route
                    path="/catalog"
                    element={
                        <Catalog products={products} onAddToCart={handleAddToCart} />
                    }
                />
                <Route path="/catalog" element={<Catalog products={products} onAddToCart={handleAddToCart} />} />
                <Route path="/product/:id" element={<ProductDetailWrapper />} />
                <Route path="/register" element={<UserRegistration />} />
            </Routes>

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
                            <p className="text-gray-400">
                                Proveedor líder de soluciones de seguridad industrial con más de 10
                                años de experiencia en el mercado.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                            <p className="text-gray-400">
                                <b>Mail:</b> caneparo@crseguridad.com
                            </p>
                            <p className="text-gray-400">
                                <b>Dirección:</b> Merlo 2338, Moreno, Buenos Aires 1744
                            </p>
                            <p className="text-gray-400">
                                <b>Teléfono:</b> (011) 1234-5678</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Boletín</h3>
                            <p className="text-gray-400 mb-4">
                                Suscríbete a nuestro boletín para recibir actualizaciones
                            </p>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
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
                onUpdateQuantity={(id: string, quantity: number) =>
                    handleUpdateQuantity(id, quantity)
                }
                onRemoveItem={(id: string) => handleRemoveItem(id)}
            />

            <WelcomePopup
                isOpen={showWelcome}
                onClose={() => setShowWelcome(false)}
                onSubmit={handleWelcomeSubmit}
            />

            
        </div>
    );
}

export default App;
