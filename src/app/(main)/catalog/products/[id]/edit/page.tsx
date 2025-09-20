'use client';

import { getProductById } from '@/lib/mock-data';
import { notFound, useParams } from 'next/navigation';
import { ProductForm } from '../../../components/product-form';
import { PageLayout } from '../../../_components/page-layout';

export default function EditProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) {
    notFound();
  }
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <PageLayout title={`Edit ${product.name}`}>
      <ProductForm product={product} />
    </PageLayout>
  );
}