import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { extractIndustries, getRandomIndustries } from '../utils';
import IndustryFilter from './IndustryFilter';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [allIndustries, setAllIndustries] = useState<string[]>([]);

  const instructions = `Special instructions for CLINE        


1. Add supabase for the form
2. Add pictures of real products for the product cards
3. Add a favicon
4. Add the all the main product categories of the industry
5. Colors keep the same
6. 

You are inside a starting project with nodeJS & express, with its FE in React & tailwind. I am on windows powershell so don't use && symbols
You are already inside a fresh nextjs project and there are images inside a folder called /Public/images/, it is a service based website, for a company that offer these products  <products>, the website should be in spanish and the website should be properly split with href language tags before the main slug of the url, for example example.com/fr/example/example. 
Use the images in an intelligent way to build a modern website with good coloring schemes and fonts and other elements which I will leave up to your discretion to plan and then implement a good, intelligent color and font and feel to it
Use <service_information> to understand specifics of the business
For languages, ensure to implement the SEO and keywords etc for both spanish and english - Also URL slugs must be translated 
The company is offering products for industries in <industries>
The idea is to generate all possible pages, combining both <services> with <locations> to create location based SEO services.
Ensure the pages are split by industry, so no two industries landing page should look the same (even if the industry page do look the same)
Make sure the colors are contrasting and not white on white or black on black at any point
The content of those pages should be landing pages for the service itself, created from a template that you have built, using the images, and the other information you know or can interpret from what you’ve been given.
Have a good looking contact us page with the <contact_details> on it
Ensure to create a phenomenal modern homepage for the website using the images and information about services to make a modular, mobilefriendly (it must not scroll horizontally on mobile) homepage

<products>
Elementos de seguridad industrial
Protección física
Protección química
Elementos visuales dissuasórios
</products>

<industries>
AERONAUTICA
AGRICOLA
ALIMENTICIA
AUTOMOTRIZ
AUTOPARTISTA
AVICOLA
CARPINTERIA
CEMENTERA
CONSTRUCCION
VIALIDAD
ELECTRICA
ELECTRONICA
FARMACEUTICA
FERRETERIA
FRIGORIFICA
FRIGORIFICO
GAS
LABORATORIO
LIMPIEZA
LOGISTICA
MANUFACTURA
METALMECANICA
METALURGICA
MINERA
MINERIA
NAVIERA
PAPELERA
PESQUERA
PETROLEO
PETROLERA
PETROQUIMICA
PINTURA
QUIMICA
SALUD
SIDERURGICA
SOLDADURA
TABACALERA
TRANSPORTE
VIALIDAD
</industries>


<contact_details>
+54 1100000000
</contact_details>


Create icons and svgs as you’re going - start with something simple
Implement ISR so the website can be built again quickly and easily
Use NextJS, and tailwind to make a unique beautiful modern modular website with 5-7 unique vertical blocks per page (more on the homepage)
Be very careful and wary of typescript errors
Make sure you are generatingStaticParams - and not confusing dynamic generation and static generation, 
Maximise build efficiency, speed, and complexity and modular nature of any pages which are generated for SEO.
Ensure to implement all slugs etc programmatically, and never create an index page link without creating the index page itself

You must be as detailed as possible with your SEO, abusing the fact that Google is very likely to rank pages that have exact phrase matches to keywords, for example “What is the meaning and Origin of X name” for my baby name website, which helps me rank for that question across all of the names in my database (which is 88k names) with a total of 100k pages, you can see how index pages, and then individual pages of that page type can really start to create scale.`;

  useEffect(() => {
    const industries = extractIndustries(instructions);
    setAllIndustries(industries);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prevIndustries) =>
      prevIndustries.includes(industry)
        ? prevIndustries.filter((c) => c !== industry)
        : [...prevIndustries, industry]
    );
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true
    )
    .filter((product) =>
      selectedIndustries.length > 0
        ? selectedIndustries.includes(product.industry) // Filter by industry
        : true
    );
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  return (
    <div className="flex p-4">
      <IndustryFilter
        allIndustries={allIndustries}
        selectedIndustries={selectedIndustries}
        onIndustryChange={handleIndustryChange}
      />
      <div className="flex-grow ml-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex flex-wrap">
            {uniqueCategories.map((category) => (
              <span
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer bg-blue-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2 ${
                  selectedCategories.includes(category) ? 'bg-opacity-100' : 'bg-opacity-50'
                }`}
              >
                {category}
              </span>
            ))}

          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
