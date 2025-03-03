export interface Product {
  _id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  category: string;
  industry: string;
  brand: string;
  code: string;
  normative: string;
  stock: number;
  imageUrl: string;
  technicalSpecs: { [key: string]: string };
  características: string; // Add this property
  especificaciones: string; // Add this property
  presentación: string; // Add this property
  documentación: string; // Add this property
}

export interface CartItem {
  _id: string;
  name: string;
  price: string;
  quantity: number;
}
