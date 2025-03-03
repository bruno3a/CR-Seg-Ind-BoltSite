import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://api.whatsapp.com/send?phone=541152218882&text=¡Hola! Me interesa hacer una compra, me pueden asesorar? Contacto desde el sitio web.', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <span className="text-sm mb-1">Contactanos!</span>
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
