'use client';

import { getProductById } from '@/lib/mock-data';
import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        setError(new Error('Product not found'));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { product, loading, error };
}