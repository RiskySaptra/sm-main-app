'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { useProduct } from '../_lib/hooks/use-product';

export default function ProductDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <div>Product not found</div>;
  }

  const { product, loading, error } = useProduct(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="p-4">
            <div className="relative aspect-square">
              <Image
                src={product.thumbnailUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Price</h2>
              {product.isOnSale && product.salePrice ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(product.salePrice)}
                  </p>
                  <p className="text-lg font-medium text-gray-500 line-through">
                    {formatCurrency(product.basePrice)}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold">
                  {formatCurrency(product.basePrice)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Status</h2>
                <Badge>{product.status}</Badge>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Brand</h2>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
            </div>
            {product.tags && (
              <div>
                <h2 className="text-xl font-semibold pb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {product.specifications && (
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium">{key}</p>
                  <p className="text-muted-foreground">{String(value)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {product.hasVariants && product.variants && (
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">SKU</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant) => (
                    <tr key={variant.id}>
                      <td>{variant.sku}</td>
                      <td>{variant.name}</td>
                      <td>{formatCurrency(variant.price)}</td>
                      <td>{variant.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
        <div className="mt-8">
          <Link href={`/catalog/products/${product.id}/edit`}>
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}