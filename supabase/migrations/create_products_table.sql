-- Create the products table
create table public.products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    price numeric not null,
    category text not null,
    icon text,
    industry text,
    brand text,
    stock integer default 0,
    image_url text,
    caracteristicas text,
    especificaciones text,
    presentacion text,
    documentacion text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create an index for faster searches
create index products_name_idx on public.products using gin (name gin_trgm_ops);
create index products_category_idx on public.products (category);
create index products_industry_idx on public.products (industry);
create index products_brand_idx on public.products (brand);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy for public read access
create policy "Products are viewable by everyone" 
on public.products for select 
to public 
using (true);

-- Create policy for authenticated users to modify products
create policy "Authenticated users can modify products" 
on public.products for all 
to authenticated 
using (true);
