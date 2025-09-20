'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { mockInventoryItems } from '@/lib/mock-data';
import { InventoryItem } from '@/app/(main)/inventory/_lib/types';

export default function InventoryOverviewPage() {
  const [items, setItems] = React.useState<InventoryItem[]>([]);

  React.useEffect(() => {
    setItems(mockInventoryItems);
  }, []);

  const lowStockItems = items.filter(
    (item) => item.quantity <= item.reorderPoint && item.quantity > 0,
  );
  const outOfStockItems = items.filter(
    (item) => item.quantity === 0 || item.status === 'OUT_OF_STOCK',
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Inventory Overview</h1>
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
    </div>
  );
}