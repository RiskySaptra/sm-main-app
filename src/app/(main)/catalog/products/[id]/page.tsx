'use client';

import ProductDetails from '../../components/product-details';
import { PageLayout } from '../../_components/page-layout';

export default function ProductDetailPage() {
  return (
    <PageLayout title="Product Details">
      <ProductDetails />
    </PageLayout>
  );
}