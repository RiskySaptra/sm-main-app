'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  MoreVertical,
  Package,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/inventory';
import { Order } from '@/lib/types';

interface OrderTrackingProps {
  orders: Order[];
  onStatusChange?: (orderId: string, status: Order['status']) => void;
  onExport?: () => void;
}

// Status configuration
const orderStatusConfig = {
  PENDING: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800',
  },
  PROCESSING: {
    label: 'Processing',
    icon: Package,
    className: 'bg-blue-100 text-blue-800',
  },
  SHIPPED: {
    label: 'Shipped',
    icon: Truck,
    className: 'bg-purple-100 text-purple-800',
  },
  DELIVERED: {
    label: 'Delivered',
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800',
  },
} as const;

export function OrderTracking({
  orders,
  onStatusChange,
  onExport,
}: OrderTrackingProps) {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'));
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as keyof typeof orderStatusConfig;
        const config = orderStatusConfig[status];
        const Icon = config.icon;
        
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <Badge
              variant="secondary"
              className={cn(config.className)}
            >
              {config.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const amount = row.getValue('total') as number;
        return formatCurrency(amount, 'IDR');
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              {Object.entries(orderStatusConfig).map(([status, config]) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onStatusChange?.(order.id, status as Order['status'])}
                  disabled={order.status === status}
                >
                  <config.icon className="mr-2 h-4 w-4" />
                  {config.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Calculate summary statistics
  const summary = orders.reduce(
    (acc, order) => {
      acc.total += order.total;
      acc[order.status.toLowerCase() as keyof typeof acc] += 1;
      return acc;
    },
    {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Value: {formatCurrency(summary.total, 'IDR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.pending + summary.processing}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending: {summary.pending} | Processing: {summary.processing}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.shipped}</div>
            <p className="text-xs text-muted-foreground">
              Active shipments being tracked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.delivered}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Orders</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={orders}
            searchKey="customerName"
          />
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <ScrollArea className="max-h-[600px]">
              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Name: {selectedOrder.customerName}</p>
                    <p>Email: {selectedOrder.customerEmail}</p>
                    <p>Shipping Address: {selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Status */}
                <div>
                  <h3 className="font-semibold">Order Status</h3>
                  <div className="mt-2 flex items-center gap-2">
                    {(() => {
                      const config = orderStatusConfig[selectedOrder.status];
                      const Icon = config.icon;
                      return (
                        <>
                          <Icon className="h-4 w-4" />
                          <Badge variant="secondary" className={config.className}>
                            {config.label}
                          </Badge>
                        </>
                      );
                    })()}
                  </div>
                  {selectedOrder.trackingNumber && (
                    <p className="mt-2 text-sm">
                      Tracking Number: {selectedOrder.trackingNumber}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold">Order Items</h3>
                  <div className="mt-4 space-y-4">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(item.unitPrice * item.quantity, 'IDR')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.unitPrice, 'IDR')} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Total */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Total</h3>
                  <p className="text-xl font-bold">
                    {formatCurrency(selectedOrder.total, 'IDR')}
                  </p>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}