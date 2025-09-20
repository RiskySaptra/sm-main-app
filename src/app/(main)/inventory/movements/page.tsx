'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { StockMovement } from '@/app/(main)/inventory/_lib/types';
import { mockStockMovements } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const columns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'referenceNumber',
    header: 'Reference Number',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return new Date(date).toLocaleDateString();
    },
  },
];

export default function MovementsPage() {
  const router = useRouter();

  const handleAddMovement = () => {
    router.push('/inventory/movements/new');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Movements</h1>
        <Button onClick={handleAddMovement}>
          <Plus className="h-4 w-4 mr-2" />
          Add Movement
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockStockMovements}
            searchKey="referenceNumber"
          />
        </CardContent>
      </Card>
    </div>
  );
}