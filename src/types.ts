
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  pages: number;
  category: string;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
