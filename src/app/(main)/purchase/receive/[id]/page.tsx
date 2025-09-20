'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { mockPurchaseOrders } from '@/lib/mock-data';
import { useParams } from 'next/navigation';

export default function ReceiveOrderPage() {
  const { toast } = useToast();
  const params = useParams();
  const { id } = params;
  const order = mockPurchaseOrders.find((o) => o.id === id);

  const [receivedQuantities, setReceivedQuantities] = React.useState<{
    [key: string]: { quantity: number; batchNumber: string };
  }>({});

  React.useEffect(() => {
    if (order) {
      const initialQuantities = order.items.reduce((acc, item) => {
        acc[item.id] = {
          quantity: item.quantity - item.receivedQuantity,
          batchNumber: '',
        };
        return acc;
      }, {} as { [key: string]: { quantity: number; batchNumber: string } });
      setReceivedQuantities(initialQuantities);
    }
  }, [order]);

  const handleQuantityChange = (
    itemId: string,
    value: number | string,
    field: 'quantity' | 'batchNumber'
  ) => {
    setReceivedQuantities((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], [field]: value },
    }));
  };

  const handleReceiveItems = () => {
    if (!order) return;

    console.log('Receiving items:', {
      orderId: order.id,
      receivedQuantities,
    });

    toast({
      title: 'Items Received',
      description: `Successfully received items for order ${order.orderNumber}.`,
      variant: 'success',
    });
  };

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Receive Order {order.orderNumber}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="font-medium">Supplier</p>
              <p>{order.supplierId}</p>
            </div>
            <div>
              <p className="font-medium">Status</p>
              <p>{order.status}</p>
            </div>
            <div>
              <p className="font-medium">Expected Delivery</p>
              <p>{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Receive Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Ordered</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>To Receive</TableHead>
                <TableHead>Batch Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.receivedQuantity}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      max={item.quantity - item.receivedQuantity}
                      value={receivedQuantities[item.id]?.quantity || ''}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10),
                          'quantity'
                        )
                      }
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={receivedQuantities[item.id]?.batchNumber || ''}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          e.target.value,
                          'batchNumber'
                        )
                      }
                      className="w-32"
                      placeholder="e.g., BATCH-001"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-6">
            <Button onClick={handleReceiveItems}>Receive Items</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}