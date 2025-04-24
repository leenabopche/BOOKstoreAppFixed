
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-book-dark text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <h3 className="font-serif text-xl font-bold">Stellar Books</h3>
            </div>
            <p className="text-book-accent text-sm">
              Your premier destination for quality books and exceptional reading experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-book-accent transition-colors">Home</Link></li>
              <li><Link to="/books" className="text-sm hover:text-book-accent transition-colors">Browse Books</Link></li>
              <li><Link to="/cart" className="text-sm hover:text-book-accent transition-colors">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Connect</h4>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-book-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-book-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Stellar Books. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
