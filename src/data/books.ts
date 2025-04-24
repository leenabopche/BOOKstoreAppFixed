
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'A novel of mystery, romance, and wealth set in the Roaring Twenties. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.',
    isbn: '978-0743273565',
    publisher: 'Scribner',
    publishYear: 1925,
    pages: 180,
    category: 'Classic Fiction',
    stock: 15
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 14.95,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. It became both an instant bestseller and a critical success when it was first published and has since been translated into more than forty languages and sold more than forty million copies worldwide.',
    isbn: '978-0060935467',
    publisher: 'Harper Perennial',
    publishYear: 1960,
    pages: 336,
    category: 'Classic Fiction',
    stock: 10
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 11.50,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell\'s nightmare vision of a totalitarian, bureaucratic world and one poor stiff\'s attempt to find individuality.',
    isbn: '978-0451524935',
    publisher: 'Signet Classic',
    publishYear: 1949,
    pages: 328,
    category: 'Dystopian',
    stock: 8
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 9.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work her "own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print."',
    isbn: '978-0141439518',
    publisher: 'Penguin Classics',
    publishYear: 1813,
    pages: 480,
    category: 'Classic Fiction',
    stock: 12
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 13.95,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
    isbn: '978-0547928227',
    publisher: 'Houghton Mifflin Harcourt',
    publishYear: 1937,
    pages: 300,
    category: 'Fantasy',
    stock: 20
  },
  {
    id: '6',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 16.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be \"human.\"",
    isbn: '978-0062316097',
    publisher: 'Harper',
    publishYear: 2015,
    pages: 464,
    category: 'Non-fiction',
    stock: 7
  }
];

let booksData = [...books];

export const getBooks = () => {
  return [...booksData];
};

export const getBookById = (id: string) => {
  return booksData.find(book => book.id === id);
};

export const addBook = (book: Omit<Book, 'id'>) => {
  const newBook = {
    ...book,
    id: Date.now().toString(),
  };
  booksData = [...booksData, newBook];
  return newBook;
};

export const updateBook = (updatedBook: Book) => {
  booksData = booksData.map(book => 
    book.id === updatedBook.id ? updatedBook : book
  );
  return updatedBook;
};

export const deleteBook = (id: string) => {
  const bookToDelete = booksData.find(book => book.id === id);
  booksData = booksData.filter(book => book.id !== id);
  return bookToDelete;
};
