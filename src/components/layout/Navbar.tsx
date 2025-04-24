
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, UserCircle, X, BookOpen } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const itemCount = cart?.items?.length || 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-book-primary" />
          <span className="font-serif text-xl font-bold text-book-primary">Stellar Books</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-book-primary transition-colors">
            Home
          </Link>
          <Link to="/books" className="text-foreground hover:text-book-primary transition-colors">
            Books
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-foreground hover:text-book-primary transition-colors">
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Auth/Cart */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Hello, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
          
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground hover:text-book-primary transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-book-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out pt-16",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <Link to="/" className="block text-lg" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/books" className="block text-lg" onClick={toggleMenu}>
            Books
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="block text-lg" onClick={toggleMenu}>
              Admin
            </Link>
          )}
          <div className="pt-4 border-t border-border">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <Button className="w-full" onClick={() => { logout(); toggleMenu(); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={toggleMenu}>Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/register" onClick={toggleMenu}>Register</Link>
                </Button>
              </div>
            )}
          </div>
          <Link to="/cart" className="flex items-center space-x-2 pt-4 border-t border-border" onClick={toggleMenu}>
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({itemCount})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
