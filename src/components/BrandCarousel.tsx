import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BrandLogo: React.FC<{ brand: { name: string; logo: string } }> = ({ brand }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-xl font-bold text-gray-700 text-center font-sans tracking-wider">
          {brand.name}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={brand.logo} 
      alt={`Logo ${brand.name}`} 
      onError={handleImageError}
      className="w-full h-24 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
    />
  );
};

const BrandCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const brands = [
    { name: '3M', logo: 'https://www.lubeseguridad.com.ar/scroll/000200122757900010001201913m.png' },
    { name: 'LAKELAND', logo: 'https://www.lakeland.com/uploads/images/logos/Lakeland-Industries-Logo.png' },
    { name: 'WYPALL', logo: 'https://www.kcprofessional.com.ar/media/10121604/wypall_logo.png' },
    { name: 'LIBUS', logo: 'https://www.lubeseguridad.com.ar/scroll/0002000928860marca-libus.jpg' },
    { name: 'STEELPRO', logo: 'https://www.lubeseguridad.com.ar/scroll/0002000528948marca-steel.jpg' },
    { name: 'DPS', logo: 'https://dpsindustrial.com.ar/wp-content/uploads/2023/03/logo-dps.png' },
    { name: 'OMBU', logo: 'https://www.lubeseguridad.com.ar/scroll/00020008275380001001120242ombu.png' },
    { name: 'FUNCIONAL', logo: 'https://www.lubeseguridad.com.ar/scroll/00020002275380001001020242funcional.png' },
    { name: 'PAMPERO', logo: 'https://www.casasilvia.com.ar/media/catalog/category/pampero_1.png' },
    { name: 'GRAFA70', logo: 'https://www.alpargatas.com.ar/uploads/logos/logo_grafa.png' },
    { name: 'MARTOR', logo: 'https://www.martor.com/fileadmin/_processed_/4/5/csm_martor_logo_2x_01_c7403c72a7.png' },
    { name: 'GAMISOL', logo: 'https://gamisol.com.ar/wp-content/uploads/2022/03/logo-gamisol.png' },
    { name: 'EAGLE', logo: 'https://eaglesafety.com/wp-content/uploads/2019/03/eagle-protection-logo.png' },
    { name: 'BILVEX', logo: 'https://bilvex.com.ar/wp-content/uploads/2021/06/logo-bilvex.png' },
    { name: 'PRENTEX', logo: 'https://www.prentex.com.ar/images/logo.png' },
    { name: 'CONOFLEX', logo: 'https://www.conoflex.com.ar/images/logo-conoflex.png' },
    { name: 'MAPA', logo: 'https://www.mapa-pro.com/wp-content/themes/mapapro/images/mapa-professional.png' },
    { name: 'DP', logo: 'https://www.dpsafety.com.ar/wp-content/uploads/2023/04/logo-dp-safety.png' },
    { name: 'UCU', logo: 'https://www.ucusal.com.ar/wp-content/uploads/2022/01/logo-ucu.png' }
  ];

  return (
    <div className="container mx-auto px-6 py-10 max-w-full bg-gray-50">
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1 mb-8" />
      <h2 className="text-2xl font-bold text-center mb-8">Marcas que confían en nosotros</h2>
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="px-4">
            <BrandLogo brand={brand} />
          </div>
        ))}
      </Slider>
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1 mt-8" />
    </div>
  );
};

export default BrandCarousel;
