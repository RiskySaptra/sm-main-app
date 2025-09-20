'use client';

import * as React from 'react';
import { StockLevels } from '@/components/inventory/stock-levels';
import { mockInventoryItems } from '@/lib/mocks/inventory';
import { Skeleton } from '@/components/ui/skeleton';
import { InventoryItem } from '@/app/(main)/inventory/_lib/types';

export function StockLevelsTab() {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<InventoryItem[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockInventoryItems);
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return <StockLevels items={items} />;
}