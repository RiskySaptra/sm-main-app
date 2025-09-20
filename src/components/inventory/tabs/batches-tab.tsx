'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Batch } from '@/app/(main)/inventory/_lib/types';
import { mockInventoryItems } from '@/lib/mocks/inventory';
import { Skeleton } from '@/components/ui/skeleton';

const columns: ColumnDef<Batch>[] = [
  {
    accessorKey: 'batchNumber',
    header: 'Batch Number',
  },
  {
    accessorKey: 'inventoryItemId',
    header: 'Inventory Item ID',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => {
      const date = row.getValue('expiryDate') as Date;
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creation Date',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return new Date(date).toLocaleDateString();
    },
  },
];

export function BatchesTab() {
  const [loading, setLoading] = React.useState(true);
  const [batches, setBatches] = React.useState<Batch[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBatches(mockInventoryItems.flatMap((item) => item.batches));
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-96" />
      </div>
    );
  }

  return <DataTable columns={columns} data={batches} searchKey="batchNumber" />;
}