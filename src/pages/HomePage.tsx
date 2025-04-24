
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ShoppingCart, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookCard } from '@/components/books/BookCard';
import { Book } from '@/types';
import { getBooks } from '@/data/books';

const HomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Get books and take the first 4 as featured
    const books = getBooks();
    setFeaturedBooks(books.slice(0, 4));
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/books?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-book-primary text-white py-16 px-4 md:py-24">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Browse our curated collection of books from classic literature to modern bestsellers.
          </p>
          
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <Input 
              placeholder="Search by title, author, or category..." 
              className="rounded-r-none border-white/20 bg-white/10 text-white placeholder:text-white/70 focus-visible:ring-book-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none bg-white text-book-primary hover:bg-book-accent hover:text-book-primary">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card book-shadow">
              <BookOpen className="h-12 w-12 text-book-primary mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Extensive Collection</h3>
              <p className="text-muted-foreground">Discover thousands of books across all genres to satisfy any reading preference.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card book-shadow">
              <ShoppingCart className="h-12 w-12 text-book-primary mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Easy Shopping</h3>
              <p className="text-muted-foreground">Simple checkout process and secure payment options for hassle-free purchasing.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card book-shadow">
              <BookMarked className="h-12 w-12 text-book-primary mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p className="text-muted-foreground">Get book recommendations based on your reading history and preferences.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-3xl font-bold">Featured Books</h2>
            <Button variant="outline" asChild>
              <Link to="/books">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-book-secondary text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="mb-8 text-lg">Browse our complete collection and find your next literary adventure today.</p>
          <Button size="lg" asChild className="bg-white text-book-secondary hover:bg-book-accent">
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
