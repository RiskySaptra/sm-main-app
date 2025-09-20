'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Batch } from '@/app/(main)/inventory/_lib/types';
import { mockInventoryItems } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function BatchesPage() {
  const batches = mockInventoryItems.flatMap((item) => item.batches);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Batch Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={batches} searchKey="batchNumber" />
        </CardContent>
      </Card>
    </div>
  );
}