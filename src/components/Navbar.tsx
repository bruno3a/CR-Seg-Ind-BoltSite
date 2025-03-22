import React, { useState, useRef } from 'react';
import { X, ShoppingCart, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
    onCartClick: () => void;
    cartItemsCount: number;
    onClientLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    onCartClick,
    cartItemsCount,
    onClientLoginClick,
}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchButtonClick = () => {
        setShowSearch(true);
        // Usar setTimeout para asegurar que el input esté en el DOM
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 50);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
            setShowSearch(false);
            setSearchTerm('');
        }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowSearch(false);
            setSearchTerm('');
        }
    };

    return (
        <>
            <div className="sticky top-0 z-50">
                <nav className="bg-black border-b border-amber-300 shadow-lg">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center h-16">
                            <Link to="/" className="flex items-center flex-shrink-0">
                                <img 
                                    src="/assets/cr-work-logo.jpeg" 
                                    alt="CR Work Logo" 
                                    className="h-12 w-12 object-cover rounded-full"
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                />
                                <span className="ml-2 text-xl font-bold text-amber-300">
                                    CR Work - Insumos para la Seguridad Industrial
                                </span>
                            </Link>

                            {/* Search Input - Centered between "Industrial" and "Inicio" */}
                            <div className="flex-1 flex justify-center mx-8">
                                <div className="relative flex items-center bg-gray-800 rounded-lg w-48 hover:w-56 transition-all duration-300">
                                    <Search className="absolute left-2 text-amber-300 w-4 h-4" />
                                    <button
                                        onClick={handleSearchButtonClick}
                                        className="w-full px-8 py-1.5 text-left text-sm text-amber-300 hover:text-amber-400 truncate"
                                    >
                                        Buscar productos
                                    </button>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-8">
                                <Link to="/" className="text-gray-300 hover:text-amber-300">
                                    Inicio
                                </Link>
                                <Link
                                    to="/catalog"
                                    className="text-gray-300 hover:text-amber-300"
                                >
                                    Productos
                                </Link>
                                <Link to="/nosotros" className="text-gray-300 hover:text-amber-300">
                                    Nosotros
                                </Link>
                                <Link to="/ubicanos" className="text-gray-300 hover:text-amber-300">
                                    Ubicanos
                                </Link>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
                                >
                                    Ingreso Clientes
                                </button>
                                <button
                                    onClick={onCartClick}
                                    className="relative bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition duration-300 flex items-center"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Orden
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Search Bar - Floating below navbar */}
                <div 
                    className={`absolute left-0 right-0 transform transition-all duration-300 ${
                        showSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    style={{
                        top: '64px', // altura del navbar
                        zIndex: 40
                    }}
                >
                    <div className="container mx-auto px-4">
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                            <div className="bg-black border border-amber-300 rounded-xl shadow-lg p-3">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Buscar productos..."
                                    className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300"
                                />
                                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
                                <button
                                    type="button"
                                    onClick={() => setShowSearch(false)}
                                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-amber-300 hover:text-amber-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-gray-900">
                                Ingreso Clientes
                            </h2>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ingresa tu contraseña"
                                />
                            </div>
<div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                  <span className="ml-2 text-sm text-gray-600">Recordar</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Recuperar contraseña?
                </a>
              </div>
              <div className="flex space-x-4">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Ingresar
              </button>
              <Link to="/register" className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-center" onClick={() => setShowLogin(false)}>
                Registrarse
              </Link>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
