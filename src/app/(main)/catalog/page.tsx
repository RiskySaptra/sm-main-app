'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ProductGrid } from '@/components/catalog/product-grid';
import { CategoryTree } from '@/components/catalog/category-tree';
import { PageHeader } from '@/components/catalog/page-header';
import { Product, Category } from '@/lib/types';
import { mockProducts, mockCategories } from '@/lib/mock-data';

interface Filter {
  [key: string]: unknown;
}

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const router = useRouter();

  const handleAddProduct = () => {
    router.push('/catalog/products/new');
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
    router.push(`/catalog/products/${product.id}`);
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


  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Product Catalog"
        actionButtonText="Add Product"
        onActionButtonClick={handleAddProduct}
      />

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