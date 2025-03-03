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
}

export interface CartItem {
  _id: string;
  name: string;
  price: string;
  quantity: number;
}
