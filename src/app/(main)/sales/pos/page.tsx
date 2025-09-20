'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  PlusCircle,
  MinusCircle,
  XCircle,
  CreditCard,
  Search,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import Image from 'next/image';

interface CartItem {
  product: typeof mockProducts[0];
  quantity: number;
}

export default function POSPage() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const addToCart = (product: typeof mockProducts[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' ||
        product.categoryId === selectedCategory)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="relative w-full h-32 mb-4">
                    {product.thumbnailUrl ? (
                      <Image
                        src={product.thumbnailUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-sm text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {formatCurrency(product.basePrice)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center">
                  <div className="flex-1">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-muted-foreground">
                      {formatCurrency(item.product.basePrice)} x{' '}
                      {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addToCart(item.product)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Separator />
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{formatCurrency(subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>{formatCurrency(tax)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{formatCurrency(total)}</p>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <CreditCard className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearCart}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}