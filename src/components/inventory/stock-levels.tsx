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

interface StockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  status: 'ACTIVE' | 'DISCONTINUED' | 'OUT_OF_STOCK';
  lastUpdated: string;
}

interface StockLevelsProps {
  items: StockItem[];
}

const columns: ColumnDef<StockItem>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'currentStock',
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
      const percentage = (item.currentStock / item.maximumStock) * 100;
      
      return (
        <div className="w-full max-w-xs">
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{item.currentStock}</span>
            <span>{item.maximumStock}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
  },
];

export function StockLevels({ items }: StockLevelsProps) {
  const lowStockItems = items.filter(
    (item) => item.currentStock <= item.minimumStock && item.currentStock > 0
  );
  const outOfStockItems = items.filter(
    (item) => item.currentStock === 0 || item.status === 'OUT_OF_STOCK'
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
          <Alert variant="warning" className="border-yellow-200 bg-yellow-50 text-yellow-800">
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
          />
        </CardContent>
      </Card>
    </div>
  );
}