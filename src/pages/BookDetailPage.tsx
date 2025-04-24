
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookDetail } from '@/components/books/BookDetail';
import { Book } from '@/types';
import { getBookById, getBooks } from '@/data/books';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BookCard } from '@/components/books/BookCard';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBook = () => {
      setLoading(true);
      try {
        if (!id) {
          navigate('/books');
          return;
        }
        
        const foundBook = getBookById(id);
        if (!foundBook) {
          navigate('/books');
          return;
        }
        
        setBook(foundBook);
        
        // Find related books (same category)
        const allBooks = getBooks();
        const related = allBooks
          .filter(b => b.id !== id && b.category === foundBook.category)
          .slice(0, 4);
        setRelatedBooks(related);
      } catch (error) {
        console.error('Error fetching book details:', error);
        navigate('/books');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[2/3] bg-muted rounded-md"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-40 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0" 
        onClick={() => navigate('/books')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Button>

      <BookDetail book={book} />

      {relatedBooks.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map(relatedBook => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
