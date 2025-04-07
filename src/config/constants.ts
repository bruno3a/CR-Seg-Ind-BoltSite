// Backend API Configuration (Express server)
export const API_URL = import.meta.env.VITE_API_URL || 'https://railway.com/project/9618bad8-9517-4c27-94a6-996e57859008';

// Supabase Configuration (Product Database)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Constantes de imágenes
export const IMAGES = {
    HERO_BACKGROUND: "https://mla-s1-p.mlstatic.com/D_NQ_NP_773577-MLA41041719255_032020-OO.webp",
    DEFAULT_PRODUCT: "/Public/placeholder-product.png"  // Actualizada la ruta
};
