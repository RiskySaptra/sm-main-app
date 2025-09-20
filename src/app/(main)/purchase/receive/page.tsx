'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockPurchaseOrders } from '@/lib/mock-data';
import { PurchaseOrderStatus } from '../_lib/types';
import { useRouter } from 'next/navigation';

export default function ReceivePage() {
  const router = useRouter();
  const ordersToReceive = mockPurchaseOrders.filter(
    (order) =>
      order.status === PurchaseOrderStatus.CONFIRMED ||
      order.status === PurchaseOrderStatus.PARTIALLY_RECEIVED
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Receive Purchase Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders Ready to Receive</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersToReceive.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.supplierId}</TableCell>
                  <TableCell>
                    <Badge>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() =>
                        router.push(`/purchase/receive/${order.id}`)
                      }
                    >
                      Receive Items
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}