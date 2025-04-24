
import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Omit<Book, 'id'> | Book) => void;
  onCancel: () => void;
}

export const BookForm = ({ book, onSubmit, onCancel }: BookFormProps) => {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    price: 0,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: '',
    isbn: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    pages: 0,
    category: '',
    stock: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'pages' || name === 'publishYear' || name === 'stock' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.author || !formData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // If editing, pass the id as well
    if (book?.id) {
      onSubmit({ ...formData, id: book.id });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-background border rounded-lg">
      <h2 className="font-serif text-2xl font-bold">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishYear">Publish Year</Label>
          <Input
            id="publishYear"
            name="publishYear"
            type="number"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.publishYear}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pages">Pages</Label>
          <Input
            id="pages"
            name="pages"
            type="number"
            min="0"
            value={formData.pages}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {book ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
};
