'use client';

import {
  SalesOrder,
  OrderStatus,
  PaymentStatus,
} from '@/app/(main)/sales-orders/_lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

const mockSalesOrder: SalesOrder = {
  id: '1',
  orderNumber: 'SO-001',
  storeId: 'STORE-1',
  customerId: 'CUST-1',
  status: OrderStatus.DELIVERED,
  paymentStatus: PaymentStatus.PAID,
  subtotal: 100,
  tax: 10,
  shipping: 5,
  total: 115,
  shippingAddress: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA',
  },
  billingAddress: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA',
  },
  items: [
    {
      id: '1',
      orderId: '1',
      inventoryItemId: 'ITEM-1',
      storeId: 'STORE-1',
      sku: 'SKU-001',
      name: 'Product A',
      quantity: 1,
      unitPrice: 100,
      subtotal: 100,
      tax: 10,
      total: 110,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function SalesOrderDetailsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Order {mockSalesOrder.orderNumber}
        </h1>
        <Button variant="outline">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">SKU</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Unit Price</th>
                    <th className="text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalesOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.unitPrice)}</td>
                      <td>{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Status</p>
                <Badge>{mockSalesOrder.status}</Badge>
              </div>
              <div>
                <p className="font-medium">Payment Status</p>
                <Badge>{mockSalesOrder.paymentStatus}</Badge>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p>{formatDate(mockSalesOrder.createdAt)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{mockSalesOrder.customerId}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}