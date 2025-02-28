export interface Product {
  _id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  category: string;
  industry: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: string;
  quantity: number;
}
