
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookList } from '@/components/books/BookList';
import { Book } from '@/types';
import { getBooks } from '@/data/books';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const fetchBooks = () => {
      setLoading(true);
      try {
        // Get books from our data source
        const allBooks = getBooks();
        setBooks(allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  // Check for search query in URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search');
    if (query) {
      // This would typically be handled by the BookList's internal search,
      // but we could pre-filter here if needed
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">Browse Books</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-48"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default BooksPage;
