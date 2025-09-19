'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
} from 'lucide-react';
import { FulfillmentOrder } from '@/lib/types';

// Form schema
const fulfillmentFormSchema = z.object({
  trackingNumber: z.string().min(1, 'Tracking number is required'),
  carrier: z.string().min(1, 'Carrier is required'),
  notes: z.string().optional(),
});

type FulfillmentFormValues = z.infer<typeof fulfillmentFormSchema>;

interface OrderFulfillmentProps {
  orders: FulfillmentOrder[];
  onUpdateStatus: (orderId: string, status: FulfillmentOrder['status']) => void;
  onShipOrder: (orderId: string, data: FulfillmentFormValues) => void;
}

// Status configuration
const fulfillmentStatusConfig = {
  PENDING: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800',
  },
  PICKING: {
    label: 'Picking',
    icon: Search,
    className: 'bg-blue-100 text-blue-800',
  },
  PACKING: {
    label: 'Packing',
    icon: Package,
    className: 'bg-purple-100 text-purple-800',
  },
  SHIPPED: {
    label: 'Shipped',
    icon: Truck,
    className: 'bg-indigo-100 text-indigo-800',
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

const priorityConfig = {
  HIGH: {
    label: 'High Priority',
    className: 'bg-red-100 text-red-800',
  },
  MEDIUM: {
    label: 'Medium Priority',
    className: 'bg-yellow-100 text-yellow-800',
  },
  LOW: {
    label: 'Low Priority',
    className: 'bg-green-100 text-green-800',
  },
} as const;

export function OrderFulfillment({
  orders,
  onUpdateStatus,
  onShipOrder,
}: OrderFulfillmentProps) {
  const [selectedOrder, setSelectedOrder] = React.useState<FulfillmentOrder | null>(null);
  const form = useForm<FulfillmentFormValues>({
    resolver: zodResolver(fulfillmentFormSchema),
  });

  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {} as Record<FulfillmentOrder['status'], FulfillmentOrder[]>);

  const handleShipOrder = (data: FulfillmentFormValues) => {
    if (selectedOrder) {
      onShipOrder(selectedOrder.id, data);
      setSelectedOrder(null);
      form.reset();
    }
  };

  return (
    <div className="space-y-6">
      {/* Fulfillment Board */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Pending & Picking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              To Process
              <Badge variant="secondary" className="ml-2">
                {(groupedOrders.PENDING?.length || 0) + (groupedOrders.PICKING?.length || 0)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {['PENDING', 'PICKING'].map((status) => (
                  <React.Fragment key={status}>
                    {groupedOrders[status as FulfillmentOrder['status']]?.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onSelect={setSelectedOrder}
                        onUpdateStatus={onUpdateStatus}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Packing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Packing
              <Badge variant="secondary" className="ml-2">
                {groupedOrders.PACKING?.length || 0}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {groupedOrders.PACKING?.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onSelect={setSelectedOrder}
                    onUpdateStatus={onUpdateStatus}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Ready to Ship */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Ready to Ship
              <Badge variant="secondary" className="ml-2">
                {groupedOrders.SHIPPED?.length || 0}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {groupedOrders.SHIPPED?.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onSelect={setSelectedOrder}
                    onUpdateStatus={onUpdateStatus}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Selected Order Details */}
      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Name: {selectedOrder.customerName}</p>
                    <p>Shipping Address: {selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold">Order Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const config = fulfillmentStatusConfig[selectedOrder.status];
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
                    <Badge
                      variant="secondary"
                      className={priorityConfig[selectedOrder.priority].className}
                    >
                      {priorityConfig[selectedOrder.priority].label}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold">Order Items</h3>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center justify-between">
                          <span>{item.productName}</span>
                          <span>x{item.quantity}</span>
                        </div>
                        {item.stockLocation && (
                          <p className="text-xs text-muted-foreground">
                            Location: {item.stockLocation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Form */}
              <div>
                <h3 className="font-semibold">Shipping Information</h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleShipOrder)}
                    className="mt-4 space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="carrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Carrier</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select carrier" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fedex">FedEx</SelectItem>
                              <SelectItem value="ups">UPS</SelectItem>
                              <SelectItem value="usps">USPS</SelectItem>
                              <SelectItem value="dhl">DHL</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trackingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tracking number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Notes</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Add any shipping notes..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedOrder(null)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Ship Order</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface OrderCardProps {
  order: FulfillmentOrder;
  onSelect: (order: FulfillmentOrder) => void;
  onUpdateStatus: (orderId: string, status: FulfillmentOrder['status']) => void;
}

function OrderCard({ order, onSelect, onUpdateStatus }: OrderCardProps) {
  const statusConfig = fulfillmentStatusConfig[order.status];
  const priorityInfo = priorityConfig[order.priority];
  const Icon = statusConfig.icon;

  const nextStatus = {
    PENDING: 'PICKING',
    PICKING: 'PACKING',
    PACKING: 'SHIPPED',
    SHIPPED: 'DELIVERED',
  } as const;

  return (
    <Card className="cursor-pointer hover:bg-accent/50" onClick={() => onSelect(order)}>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{order.id}</span>
            <Badge variant="secondary" className={priorityInfo.className}>
              {priorityInfo.label}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <Badge variant="secondary" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>{order.customerName}</p>
            <p className="truncate">{order.shippingAddress}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>{order.items.length} items</span>
            {nextStatus[order.status as keyof typeof nextStatus] && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(
                    order.id,
                    nextStatus[order.status as keyof typeof nextStatus]
                  );
                }}
              >
                Mark as {fulfillmentStatusConfig[nextStatus[order.status as keyof typeof nextStatus]].label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}