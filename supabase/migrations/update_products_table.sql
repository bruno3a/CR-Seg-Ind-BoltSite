-- Modificar la tabla products para soportar arrays
ALTER TABLE public.products 
    ALTER COLUMN category SET DATA TYPE text[] USING ARRAY[category],
    RENAME COLUMN category TO categories;

ALTER TABLE public.products
    ALTER COLUMN industry SET DATA TYPE text[] USING ARRAY[industry],
    RENAME COLUMN industry TO industries;

-- Crear índices para búsqueda eficiente
CREATE INDEX idx_products_categories ON public.products USING GIN (categories);
CREATE INDEX idx_products_industries ON public.products USING GIN (industries);