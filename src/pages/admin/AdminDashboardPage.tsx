
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types';
import { getBooks } from '@/data/books';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen, ShoppingBag, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  
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
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    
    fetchBooks();
  }, [user, navigate]);
  
  // Quick stats for dashboard
  const totalBooks = books.length;
  const totalStock = books.reduce((total, book) => total + book.stock, 0);
  const lowStockBooks = books.filter(book => book.stock < 5).length;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your bookstore inventory and more.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg shadow-sm p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Books</p>
            <h3 className="text-2xl font-bold">{totalBooks}</h3>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
            <ShoppingBag className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Stock</p>
            <h3 className="text-2xl font-bold">{totalStock}</h3>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mr-4">
            <BookOpen className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Low Stock</p>
            <h3 className="text-2xl font-bold">{lowStockBooks}</h3>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-accent/30 flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Users</p>
            <h3 className="text-2xl font-bold">-</h3>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl font-bold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-auto py-4 justify-start" asChild>
            <Link to="/admin/books/new">
              <PlusCircle className="h-5 w-5 mr-2" /> Add New Book
            </Link>
          </Button>
          <Button className="h-auto py-4 justify-start" variant="outline" asChild>
            <Link to="/admin/books">
              <BookOpen className="h-5 w-5 mr-2" /> Manage Books
            </Link>
          </Button>
          <Button className="h-auto py-4 justify-start" variant="outline" asChild>
            <Link to="/admin/settings">
              <Settings className="h-5 w-5 mr-2" /> Settings
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="lowstock">Low Stock</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="bg-card rounded-lg shadow-sm p-6 mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>Admin activity will be displayed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="lowstock" className="bg-card rounded-lg shadow-sm p-6 mt-4">
          {books.filter(book => book.stock < 5).length > 0 ? (
            <div className="divide-y divide-border">
              {books
                .filter(book => book.stock < 5)
                .map(book => (
                  <div key={book.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm ${book.stock === 0 ? 'text-destructive' : 'text-amber-500'} font-medium mr-4`}>
                        {book.stock === 0 ? 'Out of stock' : `${book.stock} remaining`}
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/admin/books/edit/${book.id}`}>Update</Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No books with low stock.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
