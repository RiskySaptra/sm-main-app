'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  Settings,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import type { StockMovement } from '@/app/(main)/inventory/_lib/types';
import { mockInventoryItems } from '@/lib/mock-data';

interface StockMovementProps {
  movements: StockMovement[];
  onAddMovement?: () => void;
}

const columns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: 'inventoryItemId',
    header: 'Product',
    cell: ({ row }) => {
      const inventoryItemId = row.getValue('inventoryItemId') as string;
      const product = mockInventoryItems.find(
        (item) => item.id === inventoryItemId,
      );
      return product ? product.name : 'Unknown Product';
    },
  },
  {
    accessorKey: 'type',
    header: 'Movement Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const typeConfig = {
        PURCHASE: {
          icon: ArrowDownCircle,
          className: 'bg-green-100 text-green-800',
        },
        SALE: {
          icon: ArrowUpCircle,
          className: 'bg-blue-100 text-blue-800',
        },
        RETURN: {
          icon: RefreshCcw,
          className: 'bg-yellow-100 text-yellow-800',
        },
        ADJUSTMENT: {
          icon: Settings,
          className: 'bg-purple-100 text-purple-800',
        },
        TRANSFER: {
          icon: RefreshCcw,
          className: 'bg-gray-100 text-gray-800',
        },
      };

      const config = typeConfig[type as keyof typeof typeConfig];
      const Icon = config.icon;

      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <Badge variant="secondary" className={config.className}>
            {type}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number;
      const type = row.getValue('type') as string;
      const isPositive = quantity > 0;

      return (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {isPositive ? '+' : ''}
            {quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'referenceNumber',
    header: 'Reference',
  },
  {
    accessorKey: 'performedBy',
    header: 'Performed By',
  },
];

export function StockMovement({ movements, onAddMovement }: StockMovementProps) {
  // Calculate movement statistics
  const stats = movements.reduce(
    (acc, movement) => {
      switch (movement.type) {
        case 'PURCHASE':
          acc.totalPurchases += movement.quantity;
          break;
        case 'SALE':
          acc.totalSales += movement.quantity;
          break;
        case 'RETURN':
          acc.totalReturns += movement.quantity;
          break;
      }
      return acc;
    },
    { totalPurchases: 0, totalSales: 0, totalReturns: 0 },
  );

  return (
    <div className="space-y-6">
      {/* Movement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Purchases</CardTitle>
            <CardDescription>Incoming stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                +{stats.totalPurchases}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>Outgoing stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">
                -{stats.totalSales}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Returns</CardTitle>
            <CardDescription>Returned stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                +{stats.totalReturns}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement History Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Stock Movements</CardTitle>
            <CardDescription>
              History of all stock movements
            </CardDescription>
          </div>
          {onAddMovement && (
            <Button onClick={onAddMovement}>
              Record Movement
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={movements}
            searchKey="inventoryItemId"
          />
        </CardContent>
      </Card>
    </div>
  );
}