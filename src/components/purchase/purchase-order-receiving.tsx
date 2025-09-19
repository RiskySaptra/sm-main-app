'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Package,
  CheckCircle2,
  FileText,
  Truck,
} from 'lucide-react';

// Mock data types
interface PurchaseOrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  receivedQuantity: number;
  status: 'pending' | 'partial' | 'complete' | 'rejected';
  qualityCheck?: {
    passed: boolean;
    notes?: string;
  };
}

interface PurchaseOrder {
  id: string;
  supplierName: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: 'pending' | 'in_transit' | 'received' | 'completed';
  trackingNumber?: string;
  items: PurchaseOrderItem[];
}

// Mock data
const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2024-001',
    supplierName: 'Supplier A',
    orderDate: '2024-03-01',
    expectedDeliveryDate: '2024-03-15',
    status: 'in_transit',
    trackingNumber: 'TRK123456789',
    items: [
      {
        id: '1',
        name: 'Item A',
        quantity: 100,
        unit: 'pcs',
        receivedQuantity: 0,
        status: 'pending',
      },
      {
        id: '2',
        name: 'Item B',
        quantity: 50,
        unit: 'kg',
        receivedQuantity: 0,
        status: 'pending',
      },
    ],
  },
  // Add more mock orders as needed
];

// Form schema for receiving items
const receiveItemSchema = z.object({
  receivedQuantity: z.number().min(0, 'Quantity must be positive'),
  qualityStatus: z.enum(['pass', 'fail']),
  notes: z.string().optional(),
});

type ReceiveItemFormValues = z.infer<typeof receiveItemSchema>;

// Status badge variants
const statusVariants = {
  pending: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-blue-100 text-blue-800',
  complete: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  in_transit: 'bg-purple-100 text-purple-800',
  received: 'bg-teal-100 text-teal-800',
  completed: 'bg-green-100 text-green-800',
};

interface PurchaseOrderReceivingProps {
  onReceiveItems?: (
    orderId: string,
    itemId: string,
    data: ReceiveItemFormValues
  ) => void;
}

export function PurchaseOrderReceiving({
  onReceiveItems,
}: PurchaseOrderReceivingProps) {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = React.useState<PurchaseOrder | null>(
    null
  );
  const [selectedItem, setSelectedItem] = React.useState<PurchaseOrderItem | null>(
    null
  );
  const [isReceivingDialogOpen, setIsReceivingDialogOpen] =
    React.useState(false);

  const form = useForm<ReceiveItemFormValues>({
    resolver: zodResolver(receiveItemSchema),
    defaultValues: {
      receivedQuantity: 0,
      qualityStatus: 'pass',
      notes: '',
    },
  });

  const handleReceiveItems = (data: ReceiveItemFormValues) => {
    if (!selectedOrder || !selectedItem) return;

    onReceiveItems?.(selectedOrder.id, selectedItem.id, data);
    toast({
      title: 'Items Received',
      description: `Successfully received ${data.receivedQuantity} ${selectedItem.unit} of ${selectedItem.name}`,
    });
    setIsReceivingDialogOpen(false);
    form.reset();
  };

  const openReceivingDialog = (order: PurchaseOrder, item: PurchaseOrderItem) => {
    setSelectedOrder(order);
    setSelectedItem(item);
    form.reset({
      receivedQuantity: 0,
      qualityStatus: 'pass',
      notes: '',
    });
    setIsReceivingDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPurchaseOrders.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockPurchaseOrders.filter(
                  (order) => order.status === 'in_transit'
                ).length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipt</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockPurchaseOrders.filter(
                  (order) => order.status === 'pending'
                ).length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockPurchaseOrders.filter(
                  (order) => order.status === 'completed'
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            Manage and track incoming purchase orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPurchaseOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        {order.supplierName}
                      </CardTitle>
                      <CardDescription>
                        Order ID: {order.id} | Expected Delivery:{' '}
                        {order.expectedDeliveryDate}
                      </CardDescription>
                    </div>
                    <Badge
                      className={cn(
                        'text-xs',
                        statusVariants[order.status]
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Ordered</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>
                            {item.receivedQuantity} {item.unit}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                'text-xs',
                                statusVariants[item.status]
                              )}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openReceivingDialog(order, item)}
                              disabled={order.status === 'completed'}
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
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isReceivingDialogOpen}
        onOpenChange={setIsReceivingDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Receive Items</DialogTitle>
            <DialogDescription>
              Enter receiving details and perform quality check
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleReceiveItems)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="receivedQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Received Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={selectedItem.quantity - selectedItem.receivedQuantity}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualityStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Check</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quality status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pass">Pass</SelectItem>
                          <SelectItem value="fail">Fail</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any notes about the received items..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsReceivingDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Confirm Receipt</Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}