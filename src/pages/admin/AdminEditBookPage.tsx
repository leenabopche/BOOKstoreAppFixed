
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { getBookById, updateBook, addBook } from '@/data/books';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BookForm } from '@/components/admin/BookForm';
import { toast } from '@/components/ui/use-toast';

const AdminEditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const isNewBook = id === 'new';
  
  useEffect(() => {
    // Redirect if not admin
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    
    const fetchBook = () => {
      setLoading(true);
      if (isNewBook) {
        setBook(null);
        setLoading(false);
        return;
      }
      
      try {
        if (!id) {
          navigate('/admin/books');
          return;
        }
        
        const foundBook = getBookById(id);
        if (!foundBook) {
          toast({
            title: "Book not found",
            description: "The requested book does not exist",
            variant: "destructive"
          });
          navigate('/admin/books');
          return;
        }
        
        setBook(foundBook);
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast({
          title: "Error",
          description: "Failed to load book details",
          variant: "destructive"
        });
        navigate('/admin/books');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id, navigate, user, isNewBook]);

  const handleSubmit = (bookData: Omit<Book, 'id'> | Book) => {
    try {
      if (isNewBook) {
        const newBook = addBook(bookData);
        toast({
          title: "Book added",
          description: `"${newBook.title}" has been added to the inventory`,
        });
      } else {
        // When editing, bookData should include the id
        updateBook(bookData as Book);
        toast({
          title: "Book updated",
          description: `"${bookData.title}" has been updated`,
        });
      }
      navigate('/admin/books');
    } catch (error) {
      toast({
        title: "Error",
        description: isNewBook ? "Failed to add book" : "Failed to update book",
        variant: "destructive"
      });
      console.error('Error saving book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0" 
        onClick={() => navigate('/admin/books')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Button>

      <h1 className="font-serif text-3xl font-bold mb-8">
        {isNewBook ? 'Add New Book' : 'Edit Book'}
      </h1>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      ) : (
        <BookForm 
          book={book || undefined} 
          onSubmit={handleSubmit} 
          onCancel={() => navigate('/admin/books')}
        />
      )}
    </div>
  );
};

export default AdminEditBookPage;
