import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:3010';

const newProducts = [
  // Productos 3M
  {
    name: "Respirador 3M 8210",
    description: "Respirador desechable N95 para partículas",
    price: 15,
    category: "Protección Respiratoria",
    icon: "https://www.3m.com/3M/en_US/p/d/v000057779/",
    industry: "MANUFACTURA",
    brand: "3M",
    stock: 100,
    características: "Respirador N95 con diseño de copa, brinda una efectiva, confortable e higiénica protección respiratoria",
    especificaciones: "Certificación NIOSH N95, Eficiencia de filtración: 95%, Clip nasal ajustable",
    presentación: "Caja con 20 unidades",
    documentación: "https://www.3m.com/3M/en_US/p/d/v000057779/"
  },
  {
    name: "Cinta Reflectiva 3M 983",
    description: "Cinta reflectiva de alta visibilidad",
    price: 45,
    category: "Señalización",
    icon: "https://www.3m.com/3M/en_US/p/d/v000086833/",
    industry: "CONSTRUCCION",
    brand: "3M",
    stock: 50,
    características: "Cinta reflectiva de grado diamante para vehículos y equipos",
    especificaciones: "Ancho: 2 pulgadas, Largo: 50m, Color: Rojo/Blanco",
    presentación: "Rollo individual",
    documentación: "https://www.3m.com/3M/en_US/p/d/v000086833/"
  },
  {
    name: "Protector Auditivo 3M PELTOR X4A",
    description: "Orejeras de alta atenuación",
    price: 35,
    category: "Protección Auditiva",
    icon: "https://www.3m.com/3M/en_US/p/d/v000142023/",
    industry: "MANUFACTURA",
    brand: "3M",
    stock: 75,
    características: "Orejeras con alto nivel de atenuación en un diseño estilizado y bajo perfil",
    especificaciones: "NRR: 27 dB, Peso: 234g, Dieléctrico",
    presentación: "Unidad en blister",
    documentación: "https://www.3m.com/3M/en_US/p/d/v000142023/"
  },
  {
    name: "Gafas 3M SecureFit 400",
    description: "Gafas de seguridad con tecnología de difusión de presión",
    price: 12,
    category: "Protección Visual",
    icon: "https://www.3m.com/3M/en_US/p/d/v000090003/",
    industry: "CONSTRUCCION",
    brand: "3M",
    stock: 150,
    características: "Lentes de seguridad con patillas autoajustables y protección UV",
    especificaciones: "Anti-rayadura, Anti-empañante, Protección UV 99.9%",
    presentación: "Unidad en bolsa individual",
    documentación: "https://www.3m.com/3M/en_US/p/d/v000090003/"
  },
  {
    name: "Guantes 3M Comfort Grip",
    description: "Guantes de trabajo con recubrimiento de nitrilo",
    price: 8,
    category: "Protección Manual",
    icon: "https://www.3m.com/3M/en_US/p/d/v000090779/",
    industry: "MANUFACTURA",
    brand: "3M",
    stock: 200,
    características: "Guantes de nylon con recubrimiento de nitrilo para mayor agarre",
    especificaciones: "Tallas: S/M/L/XL, Recubrimiento: Nitrilo, Lavable",
    presentación: "Par en bolsa individual",
    documentación: "https://www.3m.com/3M/en_US/p/d/v000090779/"
  },

  // Productos Pampero
  {
    name: "Mameluco Pampero Grafa",
    description: "Mameluco de trabajo en tela Grafa",
    price: 55,
    category: "Indumentaria de Trabajo",
    icon: "https://example.com/mameluco-pampero.jpg",
    industry: "CONSTRUCCION",
    brand: "PAMPERO",
    stock: 80,
    características: "Mameluco de trabajo resistente con múltiples bolsillos",
    especificaciones: "Material: Grafa 70, Tallas: 38-60, Triple costura",
    presentación: "Unidad en bolsa",
    documentación: "https://pampero.com.ar/productos/mameluco-grafa"
  },
  {
    name: "Pantalón Cargo Pampero",
    description: "Pantalón cargo reforzado",
    price: 35,
    category: "Indumentaria de Trabajo",
    icon: "https://example.com/pantalon-pampero.jpg",
    industry: "CONSTRUCCION",
    brand: "PAMPERO",
    stock: 120,
    características: "Pantalón cargo con bolsillos reforzados y triple costura",
    especificaciones: "Material: Gabardina, Tallas: 38-56, Bolsillos cargo",
    presentación: "Unidad en percha",
    documentación: "https://pampero.com.ar/productos/pantalon-cargo"
  },
  {
    name: "Camisa Pampero Trabajo",
    description: "Camisa de trabajo manga larga",
    price: 28,
    category: "Indumentaria de Trabajo",
    icon: "https://example.com/camisa-pampero.jpg",
    industry: "MANUFACTURA",
    brand: "PAMPERO",
    stock: 100,
    características: "Camisa de trabajo resistente con botones reforzados",
    especificaciones: "Material: Algodón 100%, Tallas: 38-48, Manga larga",
    presentación: "Unidad en percha",
    documentación: "https://pampero.com.ar/productos/camisa-trabajo"
  },
  {
    name: "Chaleco Pampero Multibolsillos",
    description: "Chaleco de trabajo con múltiples bolsillos",
    price: 42,
    category: "Indumentaria de Trabajo",
    icon: "https://example.com/chaleco-pampero.jpg",
    industry: "CONSTRUCCION",
    brand: "PAMPERO",
    stock: 60,
    características: "Chaleco con múltiples bolsillos y cierre reforzado",
    especificaciones: "Material: Ripstop, Tallas: M-XXL, 12 bolsillos",
    presentación: "Unidad en percha",
    documentación: "https://pampero.com.ar/productos/chaleco-multibolsillos"
  },
  {
    name: "Campera Pampero Trabajo",
    description: "Campera de trabajo impermeable",
    price: 65,
    category: "Indumentaria de Trabajo",
    icon: "https://example.com/campera-pampero.jpg",
    industry: "CONSTRUCCION",
    brand: "PAMPERO",
    stock: 45,
    características: "Campera impermeable con capucha desmontable",
    especificaciones: "Material: Poliéster/PVC, Tallas: S-XXL, Impermeable",
    presentación: "Unidad en percha",
    documentación: "https://pampero.com.ar/productos/campera-trabajo"
  }
];

const insertProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products/add-multiple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProducts)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al insertar productos');
    }

    console.log('Productos insertados exitosamente:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

insertProducts();