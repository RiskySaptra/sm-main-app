'use client';

import * as React from 'react';
import { SupplierManagement } from '@/components/purchase/supplier-management';
import { useToast } from '@/hooks/use-toast';
import {
  Supplier,
  SupplierStatus,
} from '@/app/(main)/purchase/_lib/types';
import { PageLayout } from '@/app/(main)/catalog/_components/page-layout';

interface SupplierData {
  name: string;
  [key: string]: unknown;
}

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Supplier A',
    storeId: 'STORE-1',
    code: 'SUP-A',
    contactPerson: 'John Doe',
    email: 'john.doe@suppliera.com',
    phone: '123-456-7890',
    address: {
      street: '123 Supplier St',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.ACTIVE,
    categories: ['Raw Materials'],
    rating: 4.5,
    createdAt: new Date('2023-01-15T09:00:00Z'),
    updatedAt: new Date('2023-01-15T09:00:00Z'),
    totalOrderValue: 15000,
    orderCount: 10,
  },
  {
    id: '2',
    name: 'Supplier B',
    storeId: 'STORE-1',
    code: 'SUP-B',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@supplierb.com',
    phone: '098-765-4321',
    address: {
      street: '456 Supplier Ave',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.INACTIVE,
    categories: ['Packaging'],
    rating: 3.8,
    createdAt: new Date('2023-02-20T10:00:00Z'),
    updatedAt: new Date('2023-02-20T10:00:00Z'),
    totalOrderValue: 25000,
    orderCount: 15,
  },
];

export default function SuppliersPage() {
  const { toast } = useToast();

  const handleAddSupplier = (data: SupplierData) => {
    console.log('Adding supplier:', data);
    toast({
      title: 'Supplier Added',
      description: `${data.name} has been added as a new supplier.`,
    });
  };

  const handleUpdateSupplier = (id: string, data: Partial<Supplier>) => {
    console.log(`Updating supplier ${id}:`, data);
    toast({
      title: 'Supplier Updated',
      description: `Supplier ${id} has been updated.`,
    });
  };

  return (
    <PageLayout title="Suppliers">
      <SupplierManagement
        suppliers={mockSuppliers}
        onAddSupplier={handleAddSupplier}
        onUpdateSupplier={handleUpdateSupplier}
      />
    </PageLayout>
  );
}