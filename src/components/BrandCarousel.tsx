import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BrandCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 7,
  };

  // Placeholder brand logos - replace with actual URLs
  const brands = [
    'https://www.lubeseguridad.com.ar/scroll/00020008275380001001120242ombu.png',
    'https://www.lubeseguridad.com.ar/scroll/0002000528948marca-steel.jpg',
    'https://www.lubeseguridad.com.ar/scroll/00020002275380001001020242funcional.png',
    'https://www.lubeseguridad.com.ar/scroll/0002000928860marca-libus.jpg',
    'https://www.lubeseguridad.com.ar/scroll/000200122757900010001201913m.png',
    'https://www.lubeseguridad.com.ar/scroll/00020010275790001000320191kraftex.png'
  ];

  return (
    <div className="container mx-auto px-6 py-5 max-w-full">
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1" />
      <h2 className="text-2xl font-bold text-center mb-8">Marcas que confían en nosotros</h2>
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="px-2">
            <img src={brand} alt={`Brand ${index + 1}`} className="w-full h-32 object-contain" />
          </div>
        ))}
      </Slider>
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1" />
    </div>
  );
};

export default BrandCarousel;
