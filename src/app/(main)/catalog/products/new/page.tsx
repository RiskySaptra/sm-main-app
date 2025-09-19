'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/catalog/product-form';
import { PageHeader } from '@/components/catalog/page-header';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  basePrice: z.number().min(0, 'Price must be a positive number'),
  status: z.string().min(1, 'Status is required'),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  isOnSale: z.boolean(),
  salePrice: z.number().optional(),
  tags: z.array(z.object({ value: z.string() })).optional(),
});

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Implement API call to create product
    console.log('Create product:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    router.push('/catalog/products');
  };

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Create New Product" />
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}