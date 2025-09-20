'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Building2, Users, FileText } from 'lucide-react';

// Mock data - replace with actual data fetching
const mockStores = [
  { id: '1', name: 'Main Store', createdAt: new Date() },
  { id: '2', name: 'Second Store', createdAt: new Date() },
];

const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', createdAt: new Date() },
  { id: '2', name: 'Manager User', email: 'manager@example.com', createdAt: new Date() },
];

const mockInvoices = [
  { id: '1', storeName: 'Main Store', amount: 5000, createdAt: new Date() },
  { id: '2', storeName: 'Second Store', amount: 7500, createdAt: new Date() },
];

export default function BackofficeDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Backoffice Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInvoices.length}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            A log of recent activities in the backoffice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStores.map((store) => (
                <TableRow key={`store-${store.id}`}>
                  <TableCell>
                    <Badge>Store</Badge>
                  </TableCell>
                  <TableCell>New store created: {store.name}</TableCell>
                  <TableCell>
                    {new Date(store.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {mockUsers.map((user) => (
                <TableRow key={`user-${user.id}`}>
                  <TableCell>
                    <Badge variant="secondary">User</Badge>
                  </TableCell>
                  <TableCell>New user created: {user.name}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {mockInvoices.map((invoice) => (
                <TableRow key={`invoice-${invoice.id}`}>
                  <TableCell>
                    <Badge variant="outline">Invoice</Badge>
                  </TableCell>
                  <TableCell>
                    New invoice for {invoice.storeName} of ${invoice.amount}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.createdAt).toLocaleDateString()}
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