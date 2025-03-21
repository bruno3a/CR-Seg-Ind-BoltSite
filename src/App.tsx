import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Lock, Building2, User, Warehouse, Bell, Users, Book, FileText, Syringe } from 'lucide-react';
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
import ClientCarousel from './components/ClientCarousel';
import { Product, CartItem } from './types';
import { Routes, Route } from 'react-router-dom';
import PersonalProtectionSection from './components/PersonalProtectionSection';
import Nosotros from './components/Nosotros';
import Ubicanos from './components/Ubicanos';

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

    return <ProductDetail product={product} onAddToCart={handleAddToCart} />;
  };

    return (
<div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
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
                                {/* Primero las secciones de Industrias y EPP */}
                                <div className="flex">
                                    <IndustriesSection />
                                    <PersonalProtectionSection />
                                </div>

                                {/* Luego las cards de Distribuidor y Novedades */}
                                <section className="mb-16">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                        <Pictogram
                                            icon={Users}
                                            title="¡Convertite en Distribuidor!"
                                            description="Ampliá tu negocio con nuestro asesoramiento. Tenemos todos los productos que necesitás. ¡Unite a nuestra red de distribuidores!"
                                            stats={[
                                                { label: 'Variedad', value: 'Más de 5000 artículos' },
                                                { label: 'Calidad', value: 'Las mejores marcas' },
                                            ]}
                                            image="/Distributor.png"
                                        />
                                        <Pictogram
                                            icon={Warehouse}
                                            title="Novedades"
                                            description="Descubrí los nuevos ingresos. Siempre hay alguna novedad."
                                            stats={[
                                                { label: 'Lo último de mercado internacional', value: 'Importados' },
                                                { label: 'La confianza de siempre', value: 'Nacionales' },
                                            ]}
                                            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        />
                                    </div>
                                </section>

                                {/* Carrusel de clientes */}
                                <div className="mb-24">
                                    <ClientCarousel />
                                </div>

                                <section className="bg-gray-50 rounded-2xl shadow-lg py-10 px-8 mb-16" 
                                    style={{ 
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/4483773/pexels-photo-4483773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center' 
                                    }}>
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl font-bold text-white mb-4">
                                            Confiá en nosotros!
                                        </h2>
                                        <p className="text-white">
                                            Amplia disponibilidad de productos, servicio de entrega y retiro en nuestro centro de distribución, consultá los nuevos ingresos!
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                         {[
                                            {
                                                icon: Users,
                                                title: 'Convertite en distribuidor',
                                                url: '#convertite-en-distribuidor'
                                            },
                                            {
                                                icon: Book,
                                                title: 'Catálogo digital',
                                                url: '#catalogo-digital'
                                            },
                                            {
                                                icon: FileText,
                                                title: 'Plantilla X',
                                                url: '#plantilla-x'
                                            },
                                            {
                                                icon: Bell,
                                                title: 'Novedades',
                                                url: '#novedades'
                                            },
                                        ].map((feature, index) => (
                                            <div key={index} className="text-center">
                <a href={feature.url} className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                </a>
                <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                </h3>
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
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/ubicanos" element={<Ubicanos />} />
            </Routes>

            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
                            <p className="text-gray-400 mb-4">
                                Proveedor líder de soluciones de seguridad industrial con más de 10
                                años de experiencia en el mercado.
                            </p>
                            <div className="flex space-x-4">
                                <a 
                                    href="https://www.instagram.com/crindustrial/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://www.linkedin.com/company/cr-work-seguridad-industrial/?originalSubdomain=ar" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                            <p className="text-gray-400">
                                <b>Mail:</b> ventas@crseguridad.com
                            </p>
                            <div className="flex items-center gap-2">
                                <a 
                                    href="https://www.google.com/maps/place/CR+Seguridad+Industrial/@-34.6496385,-58.785334,17z/data=!3m1!4b1!4m5!3m4!1s0x95bc95ab2b2a9adf:0x4471b5a50cca81bf!8m2!3d-34.6496385!4d-58.7831453"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2"
                                >
                                    <b>Dirección:</b> Merlo 2338, Moreno, Buenos Aires 1744
                                    <svg 
                                        className="w-5 h-5" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor"
                                    >
                                        <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"/>
                                    </svg>
                                </a>
                            </div>
                            <p className="text-gray-400">
                                <b>Horarios:</b> Lunes a Viernes 8:30 a 17hs
                            </p>
                            <p className="text-gray-400">
                                <b>Teléfono:</b> 0237-4636894
                            </p>
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

            <WhatsAppButton />
            
        </div>
    );
}

export default App;
