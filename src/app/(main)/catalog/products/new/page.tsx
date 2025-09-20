'use client';

import { ProductForm } from '../../components/product-form';
import { PageLayout } from '../../_components/page-layout';

export default function NewProductPage() {
  return (
    <PageLayout title="Create New Product">
      <ProductForm />
    </PageLayout>
  );
}