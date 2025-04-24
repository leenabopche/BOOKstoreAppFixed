
import { Book } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-shadow duration-200 hover:shadow-lg book-shadow">
      <Link to={`/books/${book.id}`} className="flex-grow">
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif font-bold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-muted-foreground text-sm">{book.author}</p>
          <div className="mt-2 font-bold text-book-primary">${book.price.toFixed(2)}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {book.stock > 0 
              ? `${book.stock} in stock` 
              : <span className="text-destructive">Out of stock</span>}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(book)} 
          disabled={book.stock <= 0}
          className="w-full"
          variant="outline"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
