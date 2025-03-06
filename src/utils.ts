import {
  Factory,
  Building2,
  Warehouse,
  Guitar,
  Ban,
  School,
  ShoppingBag,
  Plane,
  Users,
  Truck,
  Palette,
  Shirt,
  Building,
  Cpu,
  Wheat,
  LandPlot,
  Sailboat,
  Construction,
  Paintbrush2,
  FlaskConical,
  HeartPulse,
  Boxes,
  Database,
  Hammer,
  Wrench,
  Newspaper,
  Fish,
  Fuel,
  PaintRoller,
} from 'lucide-react';

export const iconMap: { [key: string]: React.ComponentType<any> } = {
  AERONAUTICA: Plane,
  AGRICOLA: Wheat,
  ALIMENTICIA: ShoppingBag,
  AUTOMOTRIZ: Truck,
  CARPINTERIA: Hammer,
  CEMENTERA: Building,
  CONSTRUCCION: Construction,
  VIALIDAD: LandPlot,
  ELECTRICA: Cpu,
  ELECTRONICA: Cpu,
  FARMACEUTICA: HeartPulse,
  FERRETERIA: Hammer,
  FRIGORIFICA: Warehouse,
  GAS: Fuel,
  LABORATORIO: FlaskConical,
  LIMPIEZA: Paintbrush2,
  LOGISTICA: Boxes,
  MANUFACTURA: Factory,
  METALMECANICA: Wrench,
  METALURGICA: Factory,
  MINERA: Construction,
  PAPELERA: Newspaper,
  PETROLEO: Fuel,
  PETROLERA: Fuel,
  QUIMICA: FlaskConical,
  SALUD: HeartPulse,
  SIDERURGICA: Factory,
  SOLDADURA: Wrench,
  TABACALERA: Ban,
  TRANSPORTE: Truck,
};

export const industries = [
    {
        name: 'AERONAUTICA',  // Aeronautics/Aviation Industry
        description: 'Soluciones especializadas de seguridad para mantenimiento de aeronaves, hangares y operaciones aeroportuarias.',
        image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Aircraft maintenance technicians working in hangar
    },
    {
        name: 'AGRICOLA',  // Agricultural Industry
        description: 'Equipamiento de protección para trabajo agrícola, manejo de agroquímicos y operación de maquinaria pesada.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial agricultural machinery and safety equipment
    },
    {
        name: 'ALIMENTICIA',  // Food Industry
        description: 'Elementos de seguridad para plantas procesadoras de alimentos, cumpliendo normas sanitarias y de inocuidad.',
        image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Food processing facility with workers in protective gear
    },
    {
        name: 'AUTOMOTRIZ',  // Automotive Industry
        description: 'Protección integral para líneas de ensamblaje, talleres mecánicos y plantas automotrices.',
        image: 'https://images.unsplash.com/photo-1603714228681-b399de4850fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Modern automotive assembly line with safety protocols
    },
    {
        name: 'CARPINTERIA',  // Woodworking Industry
        description: 'Equipos de protección específicos para trabajo en madera, control de polvo y manejo de maquinaria.',
        image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial woodworking facility with safety measures
    },
    {
        name: 'CEMENTERA',  // Cement Industry
        description: 'Soluciones de seguridad para plantas de cemento, protección respiratoria y control de particulados.',
        image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Cement production facility with safety protocols
    },
    {
        name: 'CONSTRUCCION',  // Construction Industry
        description: 'Equipamiento completo de seguridad para obras, incluyendo protección en altura y manejo de materiales.',
        image: 'https://images.unsplash.com/photo-1590644365607-1f81eae1d9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Construction site with workers in full PPE
    },
    {
        name: 'ELECTRICA',  // Electrical Industry
        description: 'Elementos de protección para trabajo con alta tensión y mantenimiento eléctrico industrial.',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Electrical workers with safety equipment
    },
    {
        name: 'ELECTRONICA',  // Electronics Industry
        description: 'Equipamiento antiestático y de precisión para manufactura de componentes electrónicos.',
        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Electronics assembly clean room
    },
    {
        name: 'FARMACEUTICA',  // Pharmaceutical Industry
        description: 'Protección especializada para laboratorios farmacéuticos y áreas estériles.',
        image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Pharmaceutical manufacturing facility
    },
    {
        name: 'FERRETERIA',  // Hardware/Industrial Supply
        description: 'Suministros de seguridad industrial y equipos de protección personal.',
        image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial hardware warehouse
    },
    {
        name: 'FRIGORIFICA',  // Cold Storage/Refrigeration
        description: 'Protección térmica y seguridad para trabajo en ambientes refrigerados.',
        image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial refrigeration facility
    },
    {
        name: 'GAS',  // Gas Industry
        description: 'Equipamiento especializado para manejo de gases industriales y plantas de procesamiento.',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Gas processing facility
    },
    {
        name: 'LABORATORIO',  // Laboratory
        description: 'Elementos de protección para investigación científica y análisis químicos.',
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Modern research laboratory
    },
    {
        name: 'LIMPIEZA',  // Industrial Cleaning
        description: 'Protección química y biológica para servicios de limpieza industrial.',
        image: 'https://images.unsplash.com/photo-1584784670536-8a1b7c4c7e1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial cleaning operations
    },
    {
        name: 'LOGISTICA',  // Logistics
        description: 'Seguridad para operaciones de almacenamiento y distribución.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Modern logistics warehouse
    },
    {
        name: 'MANUFACTURA',  // Manufacturing
        description: 'Soluciones integrales de seguridad para procesos de fabricación.',
        image: 'https://images.unsplash.com/photo-1624365169364-0640dd10e180?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Modern manufacturing facility
    },
    {
        name: 'METALMECANICA',  // Metalworking
        description: 'Protección especializada para mecanizado y trabajo en metales.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Metal fabrication workshop
    },
    {
        name: 'NAVIERA',  // Maritime Industry
        description: 'Equipamiento de seguridad para trabajo en astilleros y embarcaciones.',
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Shipyard operations
    },
    {
        name: 'PAPELERA',  // Paper Industry
        description: 'Protección para plantas de procesamiento de papel y celulosa.',
        image: 'https://images.unsplash.com/photo-1574492909706-09046e193f8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Paper manufacturing facility
    },
    {
        name: 'PETROLEO',  // Oil Industry
        description: 'Equipamiento de alta seguridad para exploración y refinación petrolera.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Oil refinery complex
    },
    {
        name: 'QUIMICA',  // Chemical Industry
        description: 'Protección avanzada para manejo de sustancias químicas y procesos industriales.',
        image: 'https://images.unsplash.com/photo-1616244133573-68b41f4825b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Chemical processing plant
    },
    {
        name: 'SALUD',  // Healthcare
        description: 'Elementos de protección sanitaria y bioseguridad para personal médico.',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Modern hospital facility
    },
    {
        name: 'SIDERURGICA',  // Steel Industry
        description: 'Equipamiento de alta resistencia para trabajo con metales a altas temperaturas.',
        image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Steel mill operations
    },
    {
        name: 'SOLDADURA',  // Welding
        description: 'Protección especializada para trabajos de soldadura y corte de metales.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Industrial welding operations
    },
    {
        name: 'TABACALERA',  // Tobacco Industry
        description: 'Seguridad para procesamiento y manufactura de productos de tabaco.',
        image: 'https://images.unsplash.com/photo-1574983851972-ef06ee4ea206?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Tobacco processing facility
    },
    {
        name: 'TRANSPORTE',  // Transportation
        description: 'Elementos de seguridad para transporte de carga y logística.',
        image: 'https://images.unsplash.com/photo-1586768035999-0519f5ff5c3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',  // Transportation and logistics hub
    }
];
