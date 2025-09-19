'use client';

import * as React from 'react';
import { ProductGrid } from '@/components/catalog/product-grid';
import { CategoryTree } from '@/components/catalog/category-tree';
import { SearchFilters } from '@/components/catalog/search-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Product, Category } from '@/lib/types';

interface Filter {
  [key: string]: unknown;
}

// Mock data - replace with actual API calls
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a description for product 1',
    price: 99.99,
    status: 'ACTIVE',
    category: 'Electronics',
    imageUrl: '/images/products/product-1.jpg',
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is a description for product 2',
    price: 149.99,
    status: 'ACTIVE',
    category: 'Electronics',
    imageUrl: '/images/products/product-2.jpg',
  },
  // Add more mock products as needed
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    productCount: 15,
    children: [
      {
        id: '1-1',
        name: 'Smartphones',
        productCount: 8,
      },
      {
        id: '1-2',
        name: 'Laptops',
        productCount: 7,
      },
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    productCount: 20,
    children: [
      {
        id: '2-1',
        name: 'Men',
        productCount: 10,
      },
      {
        id: '2-2',
        name: 'Women',
        productCount: 10,
      },
    ],
  },
  // Add more mock categories as needed
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleAddProduct = () => {
    // Implement add product logic
    console.log('Add product clicked');
  };

  const handleEditProduct = (product: Product) => {
    // Implement edit product logic
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (product: Product) => {
    // Implement delete product logic
    console.log('Delete product:', product);
  };

  const handleViewProduct = (product: Product) => {
    // Implement view product logic
    console.log('View product:', product);
  };

  const handleAddCategory = (parentId: string | null) => {
    // Implement add category logic
    console.log('Add category under parent:', parentId);
  };

  const handleEditCategory = (category: Category) => {
    // Implement edit category logic
    console.log('Edit category:', category);
  };

  const handleDeleteCategory = (category: Category) => {
    // Implement delete category logic
    console.log('Delete category:', category);
  };

  const handleFiltersChange = (filters: Filter) => {
    // Implement filters logic
    console.log('Filters changed:', filters);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-6">
          <CategoryTree
            categories={mockCategories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onSelectCategory={(category) => setSelectedCategory(category.id)}
            selectedCategoryId={selectedCategory ?? undefined}
          />
          <SearchFilters
            categories={mockCategories.map(({ id, name }) => ({ id, name }))}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        <div className="col-span-9">
          <ProductGrid
            products={mockProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        </div>
      </div>
    </div>
  );
}