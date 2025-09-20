'use client';

import { PageLayout } from '../../_components/page-layout';
import { CategoryForm } from '../_components/category-form';

export default function NewCategoryPage() {
  return (
    <PageLayout title="Create New Category">
      <CategoryForm />
    </PageLayout>
  );
}