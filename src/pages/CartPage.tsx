
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any books to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/books">Browse Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-6">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-4">Book</th>
                  <th className="pb-4 text-right">Price</th>
                  <th className="pb-4 text-center">Quantity</th>
                  <th className="pb-4 text-right">Total</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cart.items.map((item) => (
                  <tr key={item.book.id} className="py-4">
                    <td className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-24 rounded overflow-hidden">
                          <img
                            src={item.book.coverImage}
                            alt={item.book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/books/${item.book.id}`} 
                            className="font-medium hover:text-book-primary transition-colors"
                          >
                            {item.book.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right">${item.book.price.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity > 0) {
                              updateQuantity(item.book.id, newQuantity);
                            }
                          }} 
                          className="w-12 h-8 rounded-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          min={1}
                          max={item.book.stock}
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          disabled={item.quantity >= item.book.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-4 text-right font-medium">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-between mt-6 pt-6 border-t border-border">
              <Button 
                variant="outline" 
                className="text-muted-foreground"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button asChild variant="ghost">
                <Link to="/books">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${(cart.total * 0.10).toFixed(2)}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(cart.total * 1.10).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6">
              Checkout <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
