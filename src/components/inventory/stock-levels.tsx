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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
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
  const lowStockItems = items.filter(
    (item) => item.quantity <= item.reorderPoint && item.quantity > 0,
  );
  const outOfStockItems = items.filter(
    (item) => item.quantity === 0 || item.status === 'OUT_OF_STOCK',
  );

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outOfStockItems.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Out of Stock Items</AlertTitle>
            <AlertDescription>
              {outOfStockItems.length} items are currently out of stock and need immediate attention.
            </AlertDescription>
          </Alert>
        )}
        {lowStockItems.length > 0 && (
          <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Low Stock Warning</AlertTitle>
            <AlertDescription>
              {lowStockItems.length} items are running low and need to be restocked soon.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
            <CardDescription>All inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
            <CardDescription>Items below minimum level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {lowStockItems.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Out of Stock</CardTitle>
            <CardDescription>Items with zero stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {outOfStockItems.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Levels Table */}
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
            renderSubComponent={({ row }) => (
              <BatchDetails batches={row.original.batches} />
            )}
            getRowCanExpand={() => true}
          />
        </CardContent>
      </Card>
    </div>
  );
}