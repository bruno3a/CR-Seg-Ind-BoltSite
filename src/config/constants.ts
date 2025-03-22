// Backend API Configuration (Express server)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

// Supabase Configuration (Product Database)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Constantes de imágenes
export const IMAGES = {
    HERO_BACKGROUND: "https://mla-s1-p.mlstatic.com/D_NQ_NP_773577-MLA41041719255_032020-OO.webp",
    DEFAULT_PRODUCT: "/Public/placeholder-product.png"  // Actualizada la ruta
};
