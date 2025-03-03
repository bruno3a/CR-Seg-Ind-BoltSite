import React, { useState } from 'react';
import { Shield, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

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

    return (
        <>
            <nav className="bg-black border-b border-amber-300 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Shield className="h-8 w-8 text-amber-300" />
                            <span className="ml-2 text-xl font-bold text-amber-300">
                                CR Seguridad Industrial
                            </span>
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
              <a href="#" className="text-gray-300 hover:text-amber-300">
                Conocenos
              </a>
                            <a href="#" className="text-gray-300 hover:text-amber-300">
                                Contacto
                            </a>
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
                                Carrito
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

            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Login Clientes
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
                <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800 ml-4" onClick={() => setShowLogin(false)}>
                  Registrarse
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Loguear
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
