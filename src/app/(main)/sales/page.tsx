'use client';

import * as React from 'react';
import { OrderTracking } from '@/components/sales/order-tracking';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15T10:30:00',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    status: 'PROCESSING',
    total: 299.97,
    items: [
      {
        productId: '1',
        productName: 'Product A',
        quantity: 2,
        unitPrice: 99.99,
      },
      {
        productId: '2',
        productName: 'Product B',
        quantity: 1,
        unitPrice: 99.99,
      },
    ],
    shippingAddress: '123 Main St, City, Country',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-14T15:45:00',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    status: 'SHIPPED',
    total: 449.95,
    items: [
      {
        productId: '2',
        productName: 'Product B',
        quantity: 3,
        unitPrice: 149.99,
      },
    ],
    shippingAddress: '456 Oak Ave, Town, Country',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'POS-001',
    date: '2024-03-15T12:00:00',
    customerName: 'Walk-in Customer',
    customerEmail: '',
    status: 'DELIVERED',
    total: 55,
    items: [
      {
        productId: '3',
        productName: 'Product C',
        quantity: 1,
        unitPrice: 50,
      },
    ],
    shippingAddress: '',
  },
];

export default function SalesPage() {
  const { toast } = useToast();
  const [orders, setOrders] = React.useState(mockOrders);

  const handleOrderStatusChange = (
    orderId: string,
    status: Order['status']
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    toast({
      title: 'Status Updated',
      description: `Order ${orderId} status updated to ${status}.`,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your order data export will be ready shortly.',
    });
  };

  return (
    <div className="container space-y-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Online Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(
                orders
                  .filter((o) => o.id.startsWith('ORD'))
                  .reduce((sum, o) => sum + o.total, 0)
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Offline Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(
                orders
                  .filter((o) => o.id.startsWith('POS'))
                  .reduce((sum, o) => sum + o.total, 0)
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Order Tracking</h2>
        <OrderTracking
          orders={orders}
          onStatusChange={handleOrderStatusChange}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}