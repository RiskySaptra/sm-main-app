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
import { StoreForm } from './_components/store-form';
import { useToast } from '@/hooks/use-toast';

interface Store {
  id: string;
  name: string;
}

const mockStores: Store[] = [
  { id: '1', name: 'Main Store' },
  { id: '2', name: 'Second Store' },
];

export default function StoresPage() {
  const { toast } = useToast();
  const [stores, setStores] = React.useState(mockStores);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store | null>(null);

  const columns: ColumnDef<Store>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const store = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedStore(store);
                setIsDialogOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(store.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSubmit = (data: { name: string }) => {
    if (selectedStore) {
      // Edit
      setStores(
        stores.map((s) =>
          s.id === selectedStore.id ? { ...s, ...data } : s,
        ),
      );
      toast({ title: 'Store updated' });
    } else {
      // Create
      const newStore = { id: (stores.length + 1).toString(), ...data };
      setStores([...stores, newStore]);
      toast({ title: 'Store created' });
    }
    setIsDialogOpen(false);
    setSelectedStore(null);
  };

  const handleDelete = (id: string) => {
    setStores(stores.filter((s) => s.id !== id));
    toast({ title: 'Store deleted' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStore(null)}>Create Store</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedStore ? 'Edit Store' : 'Create Store'}
              </DialogTitle>
            </DialogHeader>
            <StoreForm
              onSubmit={handleSubmit}
              defaultValues={selectedStore || { name: '' }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={stores} searchKey="name" />
    </div>
  );
}