'use client';

import { notFound, useParams } from 'next/navigation';
import { PageLayout } from '../../../_components/page-layout';
import { CategoryForm } from '../../_components/category-form';
import { mockCategories } from '@/lib/mock-data';

export default function EditCategoryPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) {
    notFound();
  }
  const category = mockCategories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <PageLayout title={`Edit ${category.name}`}>
      <CategoryForm category={category} />
    </PageLayout>
  );
}