
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { getBooks, deleteBook } from '@/data/books';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Edit, Trash2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminBooksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  
  useEffect(() => {
    // Redirect if not admin
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    
    const fetchBooks = () => {
      try {
        const allBooks = getBooks();
        setBooks(allBooks);
        setFilteredBooks(allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    
    fetchBooks();
  }, [user, navigate]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = books.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) || 
          book.category.toLowerCase().includes(query)
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      try {
        deleteBook(bookToDelete.id);
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookToDelete.id));
        toast({
          title: "Book deleted",
          description: `"${bookToDelete.title}" has been removed from the inventory`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete book",
          variant: "destructive"
        });
      }
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Manage Books</h1>
          <p className="text-muted-foreground">View, edit and delete books in your inventory.</p>
        </div>
        <Button asChild>
          <Link to="/admin/books/new">
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Book
          </Link>
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search books..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="bg-card rounded-lg shadow-sm p-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground mb-6">
            {books.length === 0 
              ? "Your inventory is empty. Add some books to get started." 
              : "No books match your search criteria."}
          </p>
          {books.length === 0 && (
            <Button asChild>
              <Link to="/admin/books/new">Add Your First Book</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>${book.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <span className={book.stock === 0 ? 'text-destructive font-medium' : ''}>
                        {book.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/admin/books/edit/${book.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleDeleteClick(book)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBooksPage;
