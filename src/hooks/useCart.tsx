
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Book } from '@/types';

interface CartItem {
  book: Book;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: Cart;
  addToCart: (book: Book, quantity?: number) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  useEffect(() => {
    // Load cart from localStorage on mount
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart:', error);
        sessionStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total whenever cart items change
  useEffect(() => {
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.book.price * item.quantity);
    }, 0);
    
    if (total !== cart.total) {
      setCart(prev => ({ ...prev, total }));
    }
  }, [cart.items]);

  const addToCart = (book: Book, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.book.id === book.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if book already in cart
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${book.title} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return {
          ...prevCart,
          items: updatedItems,
        };
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${book.title} added to your cart`,
        });
        
        return {
          ...prevCart,
          items: [...prevCart.items, { book, quantity }],
        };
      }
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart(prevCart => {
      const itemIndex = prevCart.items.findIndex(item => item.book.id === bookId);
      
      if (itemIndex === -1) {
        return prevCart;
      }
      
      const updatedItems = [...prevCart.items];
      updatedItems[itemIndex].quantity = quantity;
      
      return {
        ...prevCart,
        items: updatedItems,
      };
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.items.find(item => item.book.id === bookId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.book.title} removed from your cart`,
        });
      }
      
      return {
        ...prevCart,
        items: prevCart.items.filter(item => item.book.id !== bookId),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
