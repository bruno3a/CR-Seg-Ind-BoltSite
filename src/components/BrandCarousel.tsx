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
      <div className="w-full h-14 flex items-center justify-center bg-gray-100 rounded-lg">
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
      className="w-full h-14 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
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
    { name: 'LAKELAND', logo: 'https://www.lakeland.com/wp-content/uploads/elementor/thumbs/lakeland-fire-safety-white-225x57-1-qt736ti477vx1tra2mah3yomp0dijclyphy2wim6ii.webp' },
    { name: 'WYPALL', logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052013/wypall.png?itok=hH7vqNTt' },
    { name: 'LIBUS', logo: 'https://www.lubeseguridad.com.ar/scroll/0002000928860marca-libus.jpg' },
    { name: 'STEELPRO', logo: 'https://www.lubeseguridad.com.ar/scroll/0002000528948marca-steel.jpg' },
    { name: 'DPS', logo: 'https://dpsindustrial.com.ar/wp-content/uploads/2023/03/logo-dps.png' },
    { name: 'OMBU', logo: 'https://www.lubeseguridad.com.ar/scroll/00020008275380001001120242ombu.png' },
    { name: 'FUNCIONAL', logo: 'https://www.lubeseguridad.com.ar/scroll/00020002275380001001020242funcional.png' },
    { name: 'PAMPERO', logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFZ_iaLBSRumQ/company-logo_200_200/company-logo_200_200/0/1686924340450/pampero_logo?e=1747872000&v=beta&t=QTG7sfZq7EZE0rWNwD8fku6uJ59ZsjnjiZG05q6q1NY' },
    { name: 'GRAFA70', logo: 'https://grafa70.com.ar/wp-content/uploads/2019/03/cropped-logo_1-2.png' },
    { name: 'MARTOR', logo: 'https://cdn.martor.com/fileadmin/martor.com/theme/dist/img/logo.png?cdnv=1742551700' },
    { name: 'GAMISOL', logo: 'https://www.gamisol.com.ar/wp-content/uploads/2023/12/isologotipoGamisol.svg' },
    { name: 'EAGLE', logo: 'https://eaglesafety.com/wp-content/uploads/2019/03/eagle-protection-logo.png' },
    { name: 'BILVEX', logo: 'https://112cc5d764.cbaul-cdnwnd.com/9f0af1af3b99aa2b896bd83211c7b1c6/system_preview_detail_200000030-886bc89675-public/LOGO%20BIL%20VEX.jpg' },
    { name: 'PRENTEX', logo: 'https://www.cas-seguridad.org.ar/wp-content/uploads/2020/08/logo-prentex.png' },
    { name: 'CONOFLEX', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHEIq5y8HxN4g/company-logo_200_200/company-logo_200_200/0/1630575160384/conoflex_argentina_logo?e=1747872000&v=beta&t=w0B2SQYgWxsy0KvsHHPohnA0L7sgWS9GDhIoEkiQPx0' },
    //{ name: 'MAPA', logo: 'https://www.mapa-pro.com/wp-content/themes/mapapro/images/mapa-professional.png' },
    { name: 'MAPA', logo: 'https://www.cas-seguridad.org.ar/wp-content/uploads/2020/08/MAPA.jpg' },
    { name: 'DP', logo: 'https://www.dpsafety.com.ar/wp-content/uploads/2023/04/logo-dp-safety.png' },
    { name: 'UCU', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGouuEyVgErYA/company-logo_200_200/company-logo_200_200/0/1630563796981/universidad_catolica_del_uruguay_logo?e=1747872000&v=beta&t=p8M9PS-5LcccSuvJ58Qsm_RNbvgoIcx9hdq_Zx2uJNM' }
  ];

  return (
    <div className="container mx-auto px-6 py-6 max-w-full bg-gray-50">
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1 mb-6" />
      <h2 className="text-2xl font-bold text-center mb-6">Marcas que confían en nosotros</h2>
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="px-4">
            <BrandLogo brand={brand} />
          </div>
        ))}
      </Slider>
      <hr className="brand-separator bg-gradient-to-r from-black via-amber-400 to-black h-1 mt-6" />
    </div>
  );
};

export default BrandCarousel;
