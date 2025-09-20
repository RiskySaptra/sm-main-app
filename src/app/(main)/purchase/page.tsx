'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Truck, Package, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockPurchaseOrders } from '@/lib/mocks/purchase';
import { PurchaseOrderStatus } from './_lib/types';

export default function PurchasePage() {
  const totalSpending = mockPurchaseOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const pendingOrders = mockPurchaseOrders.filter(
    (order) => order.status === PurchaseOrderStatus.CONFIRMED
  ).length;
  const overdueOrders = mockPurchaseOrders.filter(
    (order) =>
      order.expectedDeliveryDate < new Date() &&
      order.status !== PurchaseOrderStatus.RECEIVED
  ).length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Purchase Overview</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSpending)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total amount spent on purchase orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Purchase Orders
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPurchaseOrders.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total number of purchase orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting confirmation or delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Orders</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders past their expected delivery date
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}