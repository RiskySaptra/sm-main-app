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
import { UserForm } from './_components/user-form';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  storeId: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    storeId: '1',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    storeId: '2',
  },
];

const mockStores = [
  { id: '1', name: 'Main Store' },
  { id: '2', name: 'Second Store' },
];

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedUser(user);
                setIsDialogOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSubmit = (data: Omit<User, 'id'>) => {
    if (selectedUser) {
      // Edit
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...data } : u,
        ),
      );
      toast({ title: 'User updated' });
    } else {
      // Create
      const newUser = { id: (users.length + 1).toString(), ...data };
      setUsers([...users, newUser]);
      toast({ title: 'User created' });
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({ title: 'User deleted' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedUser(null)}>Create User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Edit User' : 'Create User'}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              onSubmit={handleSubmit}
              defaultValues={selectedUser || {}}
              stores={mockStores}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={users} searchKey="email" />
    </div>
  );
}