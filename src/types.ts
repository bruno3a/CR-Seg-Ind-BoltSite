export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  industry?: string;
  brand: string;
  code: string;
  normative: string;
  stock: number;
  imageUrl: string;
  technicalSpecs: { [key: string]: string };
  características: string;
  especificaciones: string;
  presentación: string;
  documentacion: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: string;
  quantity: number;
  brand: string;  // Añadiendo la marca
}
