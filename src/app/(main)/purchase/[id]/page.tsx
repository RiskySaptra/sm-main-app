'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockPurchaseOrders, mockSuppliers } from '@/lib/mock-data';
import {
  PurchaseOrder,
  PurchaseOrderItem,
} from '@/app/(main)/purchase/_lib/types';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PurchaseOrderReceiving } from '@/components/purchase/purchase-order-receiving';
import { useToast } from '@/hooks/use-toast';
import { PurchaseOrderStatus, ReceiptStatus } from '@/app/(main)/purchase/_lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const statusVariants = {
  DRAFT: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  SENT: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-purple-100 text-purple-800',
  PARTIALLY_RECEIVED: 'bg-blue-100 text-blue-800',
  RECEIVED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function PurchaseOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const [order, setOrder] = React.useState<PurchaseOrder | undefined>(() =>
    mockPurchaseOrders.find((o) => o.id === params.id),
  );

  if (!order) {
    notFound();
  }

  const supplier = mockSuppliers.find((s) => s.id === order.supplierId);

  const handleReceiveItems = (
    orderId: string,
    itemId: string,
    data: {
      receivedQuantity: number;
      qualityStatus: 'RECEIVED' | 'REJECTED';
      notes?: string;
    },
  ) => {
    if (!order) return;

    const updatedOrder = JSON.parse(JSON.stringify(order)); // Deep copy
    const itemToUpdate = updatedOrder.items.find(
      (i: PurchaseOrderItem) => i.id === itemId,
    );

    if (itemToUpdate) {
      itemToUpdate.receivedQuantity += data.receivedQuantity;

      if (data.qualityStatus === 'REJECTED') {
        itemToUpdate.receiptStatus = ReceiptStatus.REJECTED;
      } else if (itemToUpdate.receivedQuantity >= itemToUpdate.quantity) {
        itemToUpdate.receiptStatus = ReceiptStatus.RECEIVED;
      } else if (itemToUpdate.receivedQuantity > 0) {
        itemToUpdate.receiptStatus = ReceiptStatus.PARTIALLY_RECEIVED;
      }
    }

    const allItemsReceived = updatedOrder.items.every(
      (item: PurchaseOrderItem) => item.receiptStatus === ReceiptStatus.RECEIVED,
    );
    const someItemsReceived = updatedOrder.items.some(
      (item: PurchaseOrderItem) => item.receivedQuantity > 0,
    );

    if (allItemsReceived) {
      updatedOrder.status = PurchaseOrderStatus.RECEIVED;
    } else if (someItemsReceived) {
      updatedOrder.status = PurchaseOrderStatus.PARTIALLY_RECEIVED;
    }

    setOrder(updatedOrder);

    // Update mock data array
    const orderIndex = mockPurchaseOrders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      mockPurchaseOrders[orderIndex] = updatedOrder;
    }

    toast({
      title: 'Items Received',
      description: `${data.receivedQuantity} items ${data.qualityStatus.toLowerCase()} for order ${orderId}`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Purchase Order Details
          </h1>
          <p className="text-muted-foreground">
            Order #{order.orderNumber}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={cn('text-xs', statusVariants[order.status])}>
            {order.status}
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Receive Items</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Receive & Track</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh]">
                <PurchaseOrderReceiving
                  order={order}
                  onReceiveItems={handleReceiveItems}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Batch Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.receivedQuantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(item.unitPrice)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(item.total)}
                    </TableCell>
                    <TableCell>{item.batchNumber || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>
            <CardContent>
              {supplier && (
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {supplier.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {supplier.contactPerson}
                  </p>
                  <p>
                    <strong>Email:</strong> {supplier.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {supplier.phone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(order.tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(order.total)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}