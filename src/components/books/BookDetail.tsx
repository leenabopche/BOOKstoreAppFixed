
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BookDetailProps {
  book: Book;
}

export const BookDetail = ({ book }: BookDetailProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-md book-shadow">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-serif text-3xl font-bold">{book.title}</h1>
        <p className="text-xl text-muted-foreground mt-2">{book.author}</p>
        
        <div className="flex items-center mt-6">
          <Badge variant="outline" className="mr-2">{book.category}</Badge>
          <span className="text-muted-foreground text-sm">{book.publishYear}</span>
        </div>
        
        <div className="mt-6">
          <p className="font-bold text-xl text-book-primary">${book.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {book.stock > 0 
              ? `${book.stock} in stock` 
              : <span className="text-destructive">Out of stock</span>}
          </p>
        </div>
        
        <div className="border-t border-b border-border py-6 my-6">
          <p className="text-foreground">{book.description}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, Math.min(book.stock, parseInt(e.target.value) || 1)))}
              className="w-16 mx-2 text-center"
              min={1}
              max={book.stock}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleIncreaseQuantity}
              disabled={quantity >= book.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleAddToCart}
              disabled={book.stock <= 0}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="flex">
            <span className="font-medium w-32">ISBN:</span>
            <span>{book.isbn}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Publisher:</span>
            <span>{book.publisher}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Pages:</span>
            <span>{book.pages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
