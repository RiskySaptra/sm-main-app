'use client';

import * as React from 'react';
import { StockMovement } from '@/components/inventory/stock-movement';
import { mockStockMovements } from '@/lib/mocks/movements';
import { Skeleton } from '@/components/ui/skeleton';
import { StockMovement as StockMovementType } from '@/app/(main)/inventory/_lib/types';

export function MovementsTab() {
  const [loading, setLoading] = React.useState(true);
  const [movements, setMovements] = React.useState<StockMovementType[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMovements(mockStockMovements);
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleAddMovement = () => {
    // TODO: Implement add movement functionality
    console.log('Add movement clicked');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return <StockMovement movements={movements} onAddMovement={handleAddMovement} />;
}