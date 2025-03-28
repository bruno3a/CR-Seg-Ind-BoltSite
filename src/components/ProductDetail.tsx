import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { Download } from 'lucide-react'; // Asegúrate de importar el ícono
import { Product } from '../types';
import { IMAGES } from '../config/constants';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('características');
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const defaultImage = '/placeholder-product.png';

  const handleImageError = () => {
    setImgError(true);
  };

  const imageSource = imgError || !product.image_url ? IMAGES.DEFAULT_PRODUCT : product.image_url;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const defaultMessage = "No hay información sobre el producto, por favor solicitar al fabricante.";

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const hasValidDocumentation = (documentation: string | undefined): boolean => {
    if (!documentation) return false;
    const urls = documentation.split(';')
      .map(url => url.trim())
      .filter(url => isValidUrl(url));
    return urls.length > 0;
  };

  const renderDocumentationContent = (documentation: string | undefined) => {
    if (!documentation) {
      return defaultMessage;
    }

    const urls = documentation.split(';')
      .map(url => url.trim())
      .filter(url => isValidUrl(url));

    if (urls.length === 0) {
      return defaultMessage;
    }

    return (
      <div className="space-y-2">
        {urls.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>{index === 0 ? 'Ficha Técnica' : `Ficha Técnica ${index + 1}`}</span>
          </a>
        ))}
      </div>
    );
  };

  const hasDocumentation = hasValidDocumentation(product.documentacion);

  const tabs = [
    { 
      id: 'características', 
      label: 'Características', 
      content: product.características || defaultMessage 
    },
    { 
      id: 'especificaciones', 
      label: 'Especificaciones', 
      content: product.especificaciones || defaultMessage 
    },
    { 
      id: 'presentación', 
      label: 'Presentación', 
      content: product.presentación || defaultMessage 
    },
    { 
      id: 'documentación', 
      label: 'Documentación',
      disabled: !hasDocumentation,
      content: renderDocumentationContent(product.documentacion)
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Imagen y sección de compra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Imagen */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img
            src={imageSource}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-auto object-contain aspect-square p-4"
          />
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          {/* Información del producto */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span className="font-bold">{product.brand}</span>
              <span>•</span>
              <span>Código: {product.code || product.id}</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Sección de compra */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Comprar</h2>
            <div className="flex items-center gap-3">
              <div className="w-24">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                Agregar a la orden
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas de información técnica */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <nav className="-mb-px flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : tab.disabled
                    ? 'border-transparent text-gray-300 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`prose max-w-none ${activeTab === tab.id ? 'block' : 'hidden'}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
