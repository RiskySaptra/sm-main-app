'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef, Row } from '@tanstack/react-table';
import { InventoryItem, Batch } from '@/app/(main)/inventory/_lib/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface StockLevelsProps {
  items: InventoryItem[];
}

const BatchDetails = ({ batches }: { batches: Batch[] }) => (
  <div className="p-4 bg-gray-50">
    <h4 className="font-semibold mb-2">Batches</h4>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch Number</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Expiry Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {batches.map((batch) => (
          <TableRow key={batch.id}>
            <TableCell>{batch.batchNumber}</TableCell>
            <TableCell>{batch.quantity}</TableCell>
            <TableCell>
              {batch.expiryDate
                ? new Date(batch.expiryDate).toLocaleDateString()
                : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const columns: ColumnDef<InventoryItem>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
        </button>
      ) : null;
    },
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'quantity',
    header: 'Current Stock',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const colorMap = {
        ACTIVE: 'bg-green-100 text-green-800',
        DISCONTINUED: 'bg-gray-100 text-gray-800',
        OUT_OF_STOCK: 'bg-red-100 text-red-800',
      };

      return (
        <Badge
          variant="secondary"
          className={colorMap[status as keyof typeof colorMap]}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'stock-level',
    header: 'Stock Level',
    cell: ({ row }) => {
      const item = row.original;
      const percentage = (item.quantity / item.optimalStock) * 100;

      return (
        <div className="w-full max-w-xs">
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{item.quantity}</span>
            <span>{item.optimalStock}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as Date;
      return date.toLocaleDateString();
    },
  },
];

export function StockLevels({ items }: StockLevelsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels</CardTitle>
        <CardDescription>
          Current inventory levels for all products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={items}
          searchKey="name"
          renderSubComponent={({ row }: { row: Row<InventoryItem> }) => (
            <BatchDetails batches={row.original.batches} />
          )}
          getRowCanExpand={() => true}
        />
      </CardContent>
    </Card>
  );
}