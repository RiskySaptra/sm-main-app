'use client';

import * as React from 'react';
import { CategoryTree } from '@/components/catalog/category-tree';
import { mockCategories } from '@/lib/mock-data';
import { Category } from '@/lib/types';
import { PageLayout } from '../_components/page-layout';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const router = useRouter();

  const handleAddCategory = () => {
    router.push('/catalog/categories/new');
  };

  const handleEditCategory = (category: Category) => {
    router.push(`/catalog/categories/${category.id}/edit`);
  };

  const handleDeleteCategory = (category: Category) => {
    // Implement delete category logic
    console.log('Delete category:', category);
  };

  return (
    <PageLayout
      title="Categories"
      action={{ href: '/catalog/categories/new', label: 'Create Category' }}
    >
      <Card>
        <CardContent className="p-4">
          <CategoryTree
            categories={mockCategories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onSelectCategory={(category) => setSelectedCategory(category.id)}
            selectedCategoryId={selectedCategory ?? undefined}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}