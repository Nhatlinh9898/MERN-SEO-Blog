export interface Item {
  _id: string;
  name: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ItemInput = Omit<Item, '_id' | 'createdAt' | 'updatedAt' | 'isCompleted'>;

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export type PostInput = Omit<Post, '_id' | 'slug' | 'createdAt' | 'updatedAt'>;

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ProductComponent {
  _id: string;
  productId: string;
  name: string;
  description: string;
  quantity: number;
}

export interface CartItem extends Product {
  qty: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}