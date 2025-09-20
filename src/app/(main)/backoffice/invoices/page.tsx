'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InvoiceForm } from './_components/invoice-form';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';

interface Invoice {
  id: string;
  storeId: string;
  amount: number;
  description: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    storeId: '1',
    amount: 100.0,
    description: 'Invoice for January',
  },
  {
    id: '2',
    storeId: '2',
    amount: 250.0,
    description: 'Invoice for February',
  },
];

const mockStores = [
  { id: '1', name: 'Main Store' },
  { id: '2', name: 'Second Store' },
];

export default function InvoicesPage() {
  const { toast } = useToast();
  const [invoices, setInvoices] = React.useState(mockInvoices);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'storeId',
      header: 'Store',
      cell: ({ row }) => {
        const store = mockStores.find(
          (s) => s.id === row.getValue('storeId'),
        );
        return store ? store.name : 'N/A';
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => formatCurrency(row.getValue('amount')),
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
  ];

  const handleSubmit = (data: Omit<Invoice, 'id'>) => {
    const newInvoice = { id: (invoices.length + 1).toString(), ...data };
    setInvoices([...invoices, newInvoice]);
    toast({ title: 'Invoice created' });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Invoice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
            </DialogHeader>
            <InvoiceForm
              onSubmit={handleSubmit}
              stores={mockStores}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={invoices} searchKey="description" />
    </div>
  );
}