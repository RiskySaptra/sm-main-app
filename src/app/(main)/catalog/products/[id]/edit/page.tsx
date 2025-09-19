'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductForm } from '@/components/catalog/product-form';
import { PageHeader } from '@/components/catalog/page-header';
import { Product, ProductStatus } from '@/lib/types';
import { z } from 'zod';
import { notFound } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  basePrice: z.number().min(0, 'Price must be a positive number'),
  status: z.nativeEnum(ProductStatus),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  isOnSale: z.boolean(),
  salePrice: z.number().optional(),
  tags: z.array(z.object({ value: z.string() })).optional(),
});

import { getProductById } from '@/lib/mock-data';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        notFound();
      }
    }
  }, [id]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Implement API call to update product
    console.log('Update product:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    router.push(`/catalog/products/${id}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <PageHeader title={`Edit ${product.name}`} />
      <ProductForm product={product} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}