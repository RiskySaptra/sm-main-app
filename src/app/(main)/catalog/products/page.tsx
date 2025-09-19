'use client';

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Product } from '@/lib/types';
import { PageHeader } from '@/components/catalog/page-header';
import { mockProducts } from '@/lib/mock-data';

const products: Omit<Product, 'description' | 'images' | 'thumbnailUrl'>[] = mockProducts;

const ProductsPage = () => {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push('/catalog/products/new');
  };

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Products"
        actionButtonText="Create Product"
        onActionButtonClick={handleAddProduct}
      />
      <div className="flex items-center space-x-2 mb-4">
        <Input placeholder="Search products..." className="w-64" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Category</DropdownMenuItem>
            <DropdownMenuItem>Price</DropdownMenuItem>
            <DropdownMenuItem>Stock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.categoryId}</TableCell>
              <TableCell>${product.basePrice.toFixed(2)}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" asChild>
                  <Link href={`/catalog/products/${product.id}`}>View</Link>
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;