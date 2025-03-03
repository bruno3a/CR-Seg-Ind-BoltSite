import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string; // Allow className prop
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const handleClick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-600 transition duration-300 flex items-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      <span>Consultar</span>
    </button>
  );
};

export default WhatsAppButton;
