'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product, ProductStatus } from '@/lib/types';
import { notFound, useParams, useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { PageHeader } from '@/components/catalog/page-header';
import { getProductById } from '@/lib/mock-data';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) {
    notFound();
  }
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const handleEdit = () => {
    router.push(`/catalog/products/${id}/edit`);
  };

  const handleDelete = () => {
    console.log('Delete product:', product);
  };

  return (
    <div className="container mx-auto py-8">
      <PageHeader title={product.name} />
      <div className="space-x-2 mb-4">
        <Button onClick={handleEdit}>Edit</Button>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative aspect-square">
                <Image
                  src={product.thumbnailUrl || '/images/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Price</h2>
                {product.isOnSale && product.salePrice ? (
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(product.salePrice)}</p>
                    <p className="text-lg font-medium text-gray-500 line-through">{formatCurrency(product.basePrice)}</p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{formatCurrency(product.basePrice)}</p>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">Status</h2>
                <Badge>{product.status}</Badge>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Category ID</h2>
                <p className="text-muted-foreground">{product.categoryId}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Brand</h2>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              {product.tags && (
                <div>
                  <h2 className="text-xl font-semibold">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {product.specifications && (
                <div>
                  <h2 className="text-xl font-semibold">Specifications</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="font-medium">{key}</p>
                        <p className="text-muted-foreground">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}