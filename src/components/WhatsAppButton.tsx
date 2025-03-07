import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/+5491133866744', '_blank');
  };

  return (
    <div className="group relative">
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50 flex items-center justify-center"
        aria-label="Contactanos por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      
      {/* Tooltip */}
      <div className="fixed bottom-20 right-6 scale-0 group-hover:scale-100 transition-transform duration-200 ease-in-out bg-black text-white text-sm py-2 px-4 rounded-lg whitespace-nowrap">
        Contactanos por WhatsApp
        {/* Flecha del tooltip */}
        <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-black transform rotate-45"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
