export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  mrp?: number;
  source: 'myntra' | 'ajio' | 'amazon' | 'snitch';
  sourceUrl: string;
  addedBy: string;
  addedAt: Date;
  brand: string;
  category: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  products: Product[];
  createdAt: Date;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  groups: string[];
  personalCloset: Product[];
}
