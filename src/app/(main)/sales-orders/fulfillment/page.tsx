'use client';

import * as React from 'react';
import { OrderFulfillment } from '@/components/sales/order-fulfillment';
import { useToast } from '@/hooks/use-toast';
import { FulfillmentOrder } from '@/lib/types';

interface ShipmentData {
  trackingNumber: string;
  carrier: string;
}

const mockFulfillmentOrders: FulfillmentOrder[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15T10:30:00',
    customerName: 'John Doe',
    shippingAddress: '123 Main St, City, Country',
    items: [
      {
        productId: '1',
        productName: 'Product A',
        quantity: 2,
        unitPrice: 99.99,
        stockLocation: 'Warehouse A - Shelf 123',
      },
      {
        productId: '2',
        productName: 'Product B',
        quantity: 1,
        unitPrice: 99.99,
        stockLocation: 'Warehouse B - Shelf 456',
      },
    ],
    status: 'PICKING',
    priority: 'HIGH',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-14T15:45:00',
    customerName: 'Jane Smith',
    shippingAddress: '456 Oak Ave, Town, Country',
    items: [
      {
        productId: '2',
        productName: 'Product B',
        quantity: 3,
        unitPrice: 149.99,
        stockLocation: 'Warehouse A - Shelf 789',
      },
    ],
    status: 'PACKING',
    priority: 'MEDIUM',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-14T09:15:00',
    customerName: 'Bob Johnson',
    shippingAddress: '789 Pine Rd, Village, Country',
    items: [
      {
        productId: '3',
        productName: 'Product C',
        quantity: 1,
        unitPrice: 199.99,
        stockLocation: 'Warehouse C - Shelf 012',
      },
    ],
    status: 'PENDING',
    priority: 'LOW',
  },
];

export default function FulfillmentPage() {
  const { toast } = useToast();
  const [fulfillmentOrders, setFulfillmentOrders] = React.useState(
    mockFulfillmentOrders
  );

  const handleFulfillmentStatusChange = (
    orderId: string,
    status: FulfillmentOrder['status']
  ) => {
    setFulfillmentOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    toast({
      title: 'Fulfillment Status Updated',
      description: `Order ${orderId} fulfillment status updated to ${status}.`,
    });
  };

  const handleShipOrder = (orderId: string, data: ShipmentData) => {
    setFulfillmentOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'SHIPPED',
              trackingNumber: data.trackingNumber,
              carrier: data.carrier,
            }
          : order
      )
    );

    toast({
      title: 'Order Shipped',
      description: `Order ${orderId} has been shipped with tracking number ${data.trackingNumber}.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Order Fulfillment</h2>
      <OrderFulfillment
        orders={fulfillmentOrders}
        onUpdateStatus={handleFulfillmentStatusChange}
        onShipOrder={handleShipOrder}
      />
    </div>
  );
}