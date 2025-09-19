'use client';

import * as React from 'react';
import { OrderCreationForm } from '@/components/sales/order-creation-form';
import { OrderTracking } from '@/components/sales/order-tracking';
import { OrderFulfillment } from '@/components/sales/order-fulfillment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Order, FulfillmentOrder, OrderItem } from '@/lib/types';

interface OrderData {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: string;
  customerPhone: string;
  billingAddress: string;
  paymentMethod: string;
  notes?: string;
}

interface ShipmentData {
  trackingNumber: string;
  carrier: string;
}

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
];

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

export default function SalesPage() {
  const { toast } = useToast();
  const [orders, setOrders] = React.useState(mockOrders);
  const [fulfillmentOrders, setFulfillmentOrders] = React.useState(mockFulfillmentOrders);

  const handleOrderCreate = async (data: OrderData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOrder = {
      id: `ORD-2024-${orders.length + 1}`.padStart(11, '0'),
      date: new Date().toISOString(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      status: 'PENDING' as Order['status'],
      total: data.items.reduce(
        (sum: number, item: OrderItem) => sum + item.quantity * item.unitPrice,
        0
      ),
      items: data.items.map((item: OrderItem) => ({
        productId: item.productId,
        productName: `Product ${item.productId}`,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      shippingAddress: data.shippingAddress,
    };

    setOrders((prev) => [...prev, newOrder]);
    
    toast({
      title: 'Order Created',
      description: `Order ${newOrder.id} has been created successfully.`,
      variant: 'success',
    });
  };

  const handleOrderStatusChange = (orderId: string, status: Order['status']) => {
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

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'SHIPPED',
              trackingNumber: data.trackingNumber,
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

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your order data export will be ready shortly.',
    });
  };

  return (
    <div className="container space-y-8 py-8">
      <Tabs defaultValue="tracking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
          <TabsTrigger value="fulfillment">Order Fulfillment</TabsTrigger>
          <TabsTrigger value="create">Create Order</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Order Tracking</h2>
          <OrderTracking
            orders={orders}
            onStatusChange={handleOrderStatusChange}
            onExport={handleExport}
          />
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Order Fulfillment</h2>
          <OrderFulfillment
            orders={fulfillmentOrders}
            onUpdateStatus={handleFulfillmentStatusChange}
            onShipOrder={handleShipOrder}
          />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Create Order</h2>
          <div className="mx-auto max-w-4xl">
            <OrderCreationForm onSubmit={handleOrderCreate} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}