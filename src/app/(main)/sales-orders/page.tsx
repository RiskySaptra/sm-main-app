'use client';

import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import {
  SalesOrder,
  OrderStatus,
  PaymentStatus,
} from '@/app/(main)/sales-orders/_lib/types';
import { PageLayout } from '@/app/(main)/catalog/_components/page-layout';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const mockSalesOrders: SalesOrder[] = [
  {
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
    shippingAddress: {},
    billingAddress: {},
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    orderNumber: 'SO-002',
    storeId: 'STORE-1',
    customerId: 'CUST-2',
    status: OrderStatus.SHIPPED,
    paymentStatus: PaymentStatus.PAID,
    subtotal: 200,
    tax: 20,
    shipping: 10,
    total: 230,
    shippingAddress: {},
    billingAddress: {},
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    orderNumber: 'POS-001',
    storeId: 'STORE-1',
    customerId: 'Walk-in Customer',
    status: OrderStatus.DELIVERED,
    paymentStatus: PaymentStatus.PAID,
    subtotal: 50,
    tax: 5,
    shipping: 0,
    total: 55,
    shippingAddress: {},
    billingAddress: {},
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const columns: ColumnDef<SalesOrder>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
  },
  {
    accessorKey: 'customerId',
    header: 'Customer',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as OrderStatus;
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const paymentStatus = row.getValue('paymentStatus') as PaymentStatus;
      return <Badge>{paymentStatus}</Badge>;
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const total = row.getValue('total') as number;
      return formatCurrency(total);
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return formatDate(date);
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <a href={`/sales-orders/${order.id}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function SalesOrdersPage() {
  return (
    <PageLayout title="Sales Orders">
      <DataTable
        columns={columns}
        data={mockSalesOrders}
        searchKey="orderNumber"
      />
    </PageLayout>
  );
}